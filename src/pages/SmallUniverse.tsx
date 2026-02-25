import React, { useRef, useEffect, useMemo } from 'react';


interface ParticleData {
  positions: Float32Array;
  colors: Float32Array;
  randoms: Float32Array;
  count: number;
}

interface Buffers {
  positionBuffer: WebGLBuffer | null;
  colorBuffer: WebGLBuffer | null;
  randomBuffer: WebGLBuffer | null;
  positionAttrib: number;
  colorAttrib: number;
  randomAttrib: number;
}

interface Uniforms {
  modelMatrix: WebGLUniformLocation | null;
  viewMatrix: WebGLUniformLocation | null;
  projectionMatrix: WebGLUniformLocation | null;
  uTime: WebGLUniformLocation | null;
  uSpread: WebGLUniformLocation | null;
  uBaseSize: WebGLUniformLocation | null;
  uSizeRandomness: WebGLUniformLocation | null;
  uAlphaParticles: WebGLUniformLocation | null;
}

// The GLSL shaders - with continuous organic motion
const vertexShader: string = `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    
    // 🌟 CONTINUOUS ORGANIC FLOATING MOTION - Never stops, always flowing
    // Individual particle speeds (based on random values)
    float speed1 = random.x * 0.6 + 0.3;      // 0.3 to 0.9 - slower for golden drift
    float speed2 = random.y * 1.0 + 0.2;      // 0.2 to 1.2
    float speed3 = random.z * 1.5 + 0.1;      // 0.1 to 1.6
    float speed4 = random.w * 0.8 + 0.4;      // 0.4 to 1.2
    
    // Phase offsets - ensures continuous motion
    float phase1 = random.x * 20.0;
    float phase2 = random.y * 20.0;
    float phase3 = random.z * 20.0;
    float phase4 = random.w * 20.0;
    
    // Amplitude variations - gentle floating
    float amp1 = mix(0.1, 0.5, random.x);
    float amp2 = mix(0.08, 0.4, random.y);
    float amp3 = mix(0.12, 0.6, random.z);
    
    // 🌊 LAYERED MOTION - Multiple frequencies for natural movement
    // Base layer - very slow drift (always moving)
    float wave1x = sin(t * 0.3 * speed1 + phase1) * amp1;
    float wave1y = cos(t * 0.25 * speed2 + phase2) * amp2;
    float wave1z = sin(t * 0.35 * speed3 + phase3) * amp3;
    
    // Secondary layer - medium waves
    float wave2x = sin(t * 0.8 * speed2 + phase2 * 1.5) * amp1 * 0.6;
    float wave2y = cos(t * 1.0 * speed3 + phase3 * 1.3) * amp2 * 0.6;
    float wave2z = sin(t * 0.6 * speed4 + phase4) * amp3 * 0.6;
    
    // Subtle ripples
    float wave3x = sin(t * 2.0 * speed3 + phase3 * 2.5) * amp1 * 0.3;
    float wave3y = cos(t * 2.5 * speed4 + phase4 * 2.0) * amp2 * 0.3;
    float wave3z = sin(t * 1.8 * speed1 + phase1 * 3.0) * amp3 * 0.3;
    
    // Combine all layers for continuous motion
    mPos.x += wave1x + wave2x + wave3x;
    mPos.y += wave1y + wave2y + wave3y;
    mPos.z += wave1z + wave2z + wave3z;
    
    // Extra gentle floating
    mPos.x += sin(t * 0.5 * speed4 + phase4 * 1.8) * amp1 * 0.2;
    mPos.y += cos(t * 0.4 * speed1 + phase1 * 2.5) * amp2 * 0.2;
    mPos.z += sin(t * 0.45 * speed2 + phase2 * 2.2) * amp3 * 0.2;
    
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragmentShader: string = `
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    // Gentle pulsing for golden glow
    float pulse = sin(uTime * 1.5 + vRandom.x * 15.0) * 0.1 + 0.9;
    
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor * pulse, 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.9;
      gl_FragColor = vec4(vColor * pulse, circle);
    }
  }
`;

// Main Universe Component
const SmallUniverse: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const buffersRef = useRef<Buffers | null>(null);
  const uniformsRef = useRef<Uniforms | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(Date.now());

  // Generate particle data - GOLDEN/DARK GOLD COLOR SCHEME
  const particleData: ParticleData = useMemo(() => {
    const particleCount = 10000; // More particles for richer golden effect
    const positions: number[] = [];
    const colors: number[] = [];
    const randoms: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Position - create a rich, full universe
      const radius = Math.pow(Math.random(), 1.8) * 12;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 4;
      
      // Spiral galaxy formation
      const spiralFactor = radius * 0.6;
      const armAngle = angle + spiralFactor;
      
      let x: number, y: number, z: number;
      
      if (i < particleCount * 0.65) {
        // Spiral arms
        x = Math.cos(armAngle) * radius;
        z = Math.sin(armAngle) * radius;
        y = height * (radius * 0.25);
      } else if (i < particleCount * 0.85) {
        // Central bulge - more dense
        const r = Math.random() * 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 2;
        x = r * Math.sin(theta) * Math.cos(phi);
        y = r * Math.sin(theta) * Math.sin(phi) * 0.4;
        z = r * Math.cos(theta);
      } else {
        // Distant stars
        x = (Math.random() - 0.5) * 25;
        y = (Math.random() - 0.5) * 20;
        z = (Math.random() - 0.5) * 25;
      }

      positions.push(x, y, z);

      // 🏆 GOLDEN/DARK GOLD COLOR SCHEME - Rich warm tones
      const distFromCenter = Math.sqrt(x*x + y*y + z*z);
      
      let r: number, g: number, b: number;
      
      // Create a gradient from bright gold to deep dark gold
      
      if (distFromCenter < 3) {
        // Core - bright warm gold
        r = 1.0;
        g = 0.85 + Math.random() * 0.1;
        b = 0.4 + Math.random() * 0.2;
      } else if (distFromCenter < 6) {
        // Inner arms - rich gold
        r = 0.95;
        g = 0.75 + Math.random() * 0.15;
        b = 0.3 + Math.random() * 0.15;
      } else if (distFromCenter < 9) {
        // Outer arms - medium gold
        r = 0.85;
        g = 0.6 + Math.random() * 0.15;
        b = 0.2 + Math.random() * 0.1;
      } else {
        // Halo - dark gold / amber
        r = 0.7;
        g = 0.45 + Math.random() * 0.15;
        b = 0.15 + Math.random() * 0.1;
      }
      
      // Add subtle variation
      r += (Math.random() - 0.5) * 0.1;
      g += (Math.random() - 0.5) * 0.1;
      b += (Math.random() - 0.5) * 0.05;
      
      colors.push(r, g, b);

      // Random values for animation - more variation for continuous motion
      randoms.push(
        Math.random() * 1.2, // x
        Math.random() * 1.2, // y
        Math.random() * 1.2, // z
        Math.random() * 1.2  // w
      );
    }

    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
      randoms: new Float32Array(randoms),
      count: particleCount
    };
  }, []);

  // Compile shader
  const compileShader = (gl: WebGLRenderingContext, source: string, type: number): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  };

  // Initialize WebGL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { 
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
      powerPreference: "high-performance"
    });
    
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Set canvas size
    const resizeCanvas = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create shader program
    const program = gl.createProgram();
    if (!program) return;

    // Compile shaders
    const vertex = compileShader(gl, vertexShader, gl.VERTEX_SHADER);
    const fragment = compileShader(gl, fragmentShader, gl.FRAGMENT_SHADER);
    
    if (!vertex || !fragment) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Create buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, particleData.positions, gl.STATIC_DRAW);
    
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, particleData.colors, gl.STATIC_DRAW);
    
    const randomBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, randomBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, particleData.randoms, gl.STATIC_DRAW);

    // Get attribute locations
    const positionAttrib = gl.getAttribLocation(program, 'position');
    const colorAttrib = gl.getAttribLocation(program, 'color');
    const randomAttrib = gl.getAttribLocation(program, 'random');

    // Enable attributes
    gl.enableVertexAttribArray(positionAttrib);
    gl.enableVertexAttribArray(colorAttrib);
    gl.enableVertexAttribArray(randomAttrib);

    // Store for later use
    buffersRef.current = {
      positionBuffer,
      colorBuffer,
      randomBuffer,
      positionAttrib,
      colorAttrib,
      randomAttrib
    };

    // Get uniform locations
    uniformsRef.current = {
      modelMatrix: gl.getUniformLocation(program, 'modelMatrix'),
      viewMatrix: gl.getUniformLocation(program, 'viewMatrix'),
      projectionMatrix: gl.getUniformLocation(program, 'projectionMatrix'),
      uTime: gl.getUniformLocation(program, 'uTime'),
      uSpread: gl.getUniformLocation(program, 'uSpread'),
      uBaseSize: gl.getUniformLocation(program, 'uBaseSize'),
      uSizeRandomness: gl.getUniformLocation(program, 'uSizeRandomness'),
      uAlphaParticles: gl.getUniformLocation(program, 'uAlphaParticles')
    };

    programRef.current = program;

    // Set initial uniforms
    if (uniformsRef.current.uSpread) gl.uniform1f(uniformsRef.current.uSpread, 1.2);
    if (uniformsRef.current.uBaseSize) gl.uniform1f(uniformsRef.current.uBaseSize, 18.0);
    if (uniformsRef.current.uSizeRandomness) gl.uniform1f(uniformsRef.current.uSizeRandomness, 0.6);
    if (uniformsRef.current.uAlphaParticles) gl.uniform1f(uniformsRef.current.uAlphaParticles, 1.0);

    // Enable blending for warm golden glow
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    
    gl.disable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);

    // Animation loop - NEVER STOPS
    const animate = () => {
      if (!gl || !programRef.current || !buffersRef.current || !uniformsRef.current) {
        // Continue animation even if something is missing (will retry next frame)
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Time continuously increases - never resets, never stops
      const currentTime = (Date.now() - startTimeRef.current) / 1000;

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(programRef.current);

      const { positionBuffer, colorBuffer, randomBuffer, positionAttrib, colorAttrib, randomAttrib } = buffersRef.current;

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.vertexAttribPointer(colorAttrib, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, randomBuffer);
      gl.vertexAttribPointer(randomAttrib, 4, gl.FLOAT, false, 0, 0);

      // Camera - continuous very slow movement
      const fieldOfView = 65 * Math.PI / 180;
      const aspect = gl.canvas.width / gl.canvas.height;
      const zNear = 0.1;
      const zFar = 150.0;
      const projectionMatrix = new Float32Array(16);
      
      projectionMatrix[0] = 1 / (Math.tan(fieldOfView / 2) * aspect);
      projectionMatrix[5] = 1 / Math.tan(fieldOfView / 2);
      projectionMatrix[10] = -(zFar + zNear) / (zFar - zNear);
      projectionMatrix[11] = -1;
      projectionMatrix[14] = -(2 * zFar * zNear) / (zFar - zNear);
      projectionMatrix[15] = 0;

      // Continuous camera movement - never stops
      const viewMatrix = new Float32Array(16);
      const cameraPosition: [number, number, number] = [
        20 * Math.sin(currentTime * 0.06),
        4 + Math.sin(currentTime * 0.04) * 2,
        20 * Math.cos(currentTime * 0.06)
      ];
      const target: [number, number, number] = [0, 0, 0];
      const up: [number, number, number] = [0, 1, 0];
      
      // LookAt matrix calculation
      const zAxis: [number, number, number] = [
        target[0] - cameraPosition[0],
        target[1] - cameraPosition[1],
        target[2] - cameraPosition[2]
      ];
      const zLength = Math.sqrt(zAxis[0]*zAxis[0] + zAxis[1]*zAxis[1] + zAxis[2]*zAxis[2]);
      zAxis[0] /= zLength;
      zAxis[1] /= zLength;
      zAxis[2] /= zLength;
      
      const xAxis: [number, number, number] = [
        up[1] * zAxis[2] - up[2] * zAxis[1],
        up[2] * zAxis[0] - up[0] * zAxis[2],
        up[0] * zAxis[1] - up[1] * zAxis[0]
      ];
      const xLength = Math.sqrt(xAxis[0]*xAxis[0] + xAxis[1]*xAxis[1] + xAxis[2]*xAxis[2]);
      xAxis[0] /= xLength;
      xAxis[1] /= xLength;
      xAxis[2] /= xLength;
      
      const yAxis: [number, number, number] = [
        zAxis[1] * xAxis[2] - zAxis[2] * xAxis[1],
        zAxis[2] * xAxis[0] - zAxis[0] * xAxis[2],
        zAxis[0] * xAxis[1] - zAxis[1] * xAxis[0]
      ];
      
      viewMatrix[0] = xAxis[0];
      viewMatrix[1] = yAxis[0];
      viewMatrix[2] = zAxis[0];
      viewMatrix[3] = 0;
      viewMatrix[4] = xAxis[1];
      viewMatrix[5] = yAxis[1];
      viewMatrix[6] = zAxis[1];
      viewMatrix[7] = 0;
      viewMatrix[8] = xAxis[2];
      viewMatrix[9] = yAxis[2];
      viewMatrix[10] = zAxis[2];
      viewMatrix[11] = 0;
      viewMatrix[12] = -(xAxis[0]*cameraPosition[0] + xAxis[1]*cameraPosition[1] + xAxis[2]*cameraPosition[2]);
      viewMatrix[13] = -(yAxis[0]*cameraPosition[0] + yAxis[1]*cameraPosition[1] + yAxis[2]*cameraPosition[2]);
      viewMatrix[14] = -(zAxis[0]*cameraPosition[0] + zAxis[1]*cameraPosition[1] + zAxis[2]*cameraPosition[2]);
      viewMatrix[15] = 1;

      // Continuous galaxy rotation
      const modelMatrix = new Float32Array(16);
      const rotAngle = currentTime * 0.04;
      modelMatrix[0] = Math.cos(rotAngle);
      modelMatrix[1] = 0;
      modelMatrix[2] = Math.sin(rotAngle);
      modelMatrix[3] = 0;
      modelMatrix[4] = 0;
      modelMatrix[5] = 1;
      modelMatrix[6] = 0;
      modelMatrix[7] = 0;
      modelMatrix[8] = -Math.sin(rotAngle);
      modelMatrix[9] = 0;
      modelMatrix[10] = Math.cos(rotAngle);
      modelMatrix[11] = 0;
      modelMatrix[12] = 0;
      modelMatrix[13] = 0;
      modelMatrix[14] = 0;
      modelMatrix[15] = 1;

      // Set uniforms
      if (uniformsRef.current.modelMatrix) gl.uniformMatrix4fv(uniformsRef.current.modelMatrix, false, modelMatrix);
      if (uniformsRef.current.viewMatrix) gl.uniformMatrix4fv(uniformsRef.current.viewMatrix, false, viewMatrix);
      if (uniformsRef.current.projectionMatrix) gl.uniformMatrix4fv(uniformsRef.current.projectionMatrix, false, projectionMatrix);
      if (uniformsRef.current.uTime) gl.uniform1f(uniformsRef.current.uTime, currentTime * 1.8);

      gl.drawArrays(gl.POINTS, 0, particleData.count);
      
      // Always request next frame - animation NEVER stops
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particleData]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
};

export default SmallUniverse;