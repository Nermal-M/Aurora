# Rover 3D Model Node Structure & Inspection (Tarush)

## Model Overview
- **File**: `/public/models/tarush.glb`
- **Source**: `rover_mirrored.glb`
- **Compressed Size**: 1.03 MB (Draco compressed from original 9.09 MB via `@gltf-transform/cli`)
- **Generator**: Trimesh / OBJ exporter
- **Bounding Box**:
  - `min`: `[-0.3522, -0.4140, -0.5000]`
  - `max`: `[0.3522, 0.4140, 0.5000]`
  - `dimensions`: Width 0.704m, Height 0.828m, Depth 1.000m
- **Geometry**:
  - Vertices: 172,383
  - Triangles: 297,323
  - Primitives: 1
- **Textures & Materials**:
  - Base color PBR metallic-roughness material

## Node Hierarchy
```
Scene
└── model_852.obj (Mesh, 1 primitive, Draco compressed)
```

## Motion & Integration Strategy
1. **Node Separation**: The model was exported as a single unified mesh (`model_852.obj`). Distinct wheel or mast sub-nodes are not individually named or separated into transform nodes in this GLB.
2. **Animation Architecture**: Per specification section 6:
   > *"If nothing can be detected, skip that and keep whole-model animation only."*
   We apply whole-model dynamic transformations:
   - Turntable rotation and pitch/yaw hover parallax in Hero.
   - Translation and ghost opacity fade in About.
   - Multi-axis orbit scrubbed with scroll progress in the Tarush Rover spec showcase.
   - Smooth camera framing transitions in Subsystems.
   - Mars horizon drive-in and parking in the Footer.
3. **Calibrated 3D HUD Callout Anchors**:
   Screen-space SVG HUD callouts anchor to calibrated 3D coordinates on `model_852.obj`:
   - Drivetrain (Rocker-Bogie / Wheels): `[0.32, -0.30, 0.25]`
   - Power & Solar Subsystem: `[0.0, 0.28, -0.15]`
   - Sensor Suite (LiDAR / Stereo Depth): `[0.0, 0.38, 0.35]`
   - ROS2 Autonomy & Compute Core: `[0.0, 0.05, 0.0]`
   - High-Gain Telemetry Antenna: `[-0.25, 0.35, -0.30]`
