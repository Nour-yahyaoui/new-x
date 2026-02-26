import React, { useRef, useEffect } from 'react';

// GLSL Vertex Shader - Creates 3D shape and lighting
const vertexShader = `
  attribute vec3 position;
  attribute vec3 normal;
  attribute vec2 uv;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vLight;
  
  void main() {
    vec4 mvPosition = viewMatrix * modelMatrix * vec4(position, 1.0);
    vPosition = mvPosition.xyz;
    vNormal = normalize(mat3(viewMatrix) * normal);
    vUv = uv;
    
    // Simple lighting calculation
    vec3 lightDir = normalize(vec3(1.0, 2.0, 1.0));
    float diff = max(dot(vNormal, lightDir), 0.0);
    vLight = diff * 0.8 + 0.3;
    
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// GLSL Fragment Shader - Creates Pikachu colors and features
const fragmentShader = `
  precision highp float;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vLight;
  
  uniform float uTime;
  
  void main() {
    // Pikachu's main yellow color with variation
    vec3 yellowBase = vec3(1.0, 0.9, 0.3);
    vec3 yellowDark = vec3(0.9, 0.7, 0.2);
    vec3 red = vec3(1.0, 0.3, 0.2);
    vec3 black = vec3(0.1, 0.1, 0.1);
    vec3 white = vec3(1.0, 1.0, 1.0);
    vec3 brown = vec3(0.4, 0.2, 0.1);
    
    // Position-based coloring for different body parts
    float x = vPosition.x;
    float y = vPosition.y;
    float z = vPosition.z;
    
    vec3 color = yellowBase;
    
    // Cheeks - red circles on sides
    float cheekDist = length(vec2(x - 0.8, y - 0.2));
    if (cheekDist < 0.3) {
      color = red;
    }
    
    cheekDist = length(vec2(x + 0.8, y - 0.2));
    if (cheekDist < 0.3) {
      color = red;
    }
    
    // Ear tips - black
    if (y > 0.8 && abs(x) > 0.4) {
      color = black;
    }
    
    // Eyes
    float eyeDist = length(vec2(x - 0.3, y + 0.3));
    if (eyeDist < 0.15) {
      color = white;
    }
    
    eyeDist = length(vec2(x + 0.3, y + 0.3));
    if (eyeDist < 0.15) {
      color = white;
    }
    
    // Pupils
    float pupilDist = length(vec2(x - 0.35, y + 0.35));
    if (pupilDist < 0.05) {
      color = black;
    }
    
    pupilDist = length(vec2(x + 0.25, y + 0.35));
    if (pupilDist < 0.05) {
      color = black;
    }
    
    // Nose
    float noseDist = length(vec2(x, y));
    if (noseDist < 0.05) {
      color = black;
    }
    
    // Mouth line
    if (abs(x) < 0.2 && y < -0.1 && y > -0.2) {
      color = brown;
    }
    
    // Stripes on back
    if (z < -0.5 && abs(x) < 0.4) {
      color = brown;
    }
    
    // Apply lighting
    color *= vLight;
    
    // Add slight pulse for life
    color += sin(uTime * 3.0) * 0.03;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Vertex data for a 3D Pokémon shape
const createPokemonGeometry = () => {
  // Create vertices for a stylized Pikachu
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  // Helper function to add a sphere (for body parts)
  const addSphere = (cx: number, cy: number, cz: number, radius: number, latBands: number, lonBands: number) => {
    const startIndex = positions.length / 3;
    
    for (let lat = 0; lat <= latBands; lat++) {
      const theta = lat * Math.PI / latBands;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      
      for (let lon = 0; lon <= lonBands; lon++) {
        const phi = lon * 2 * Math.PI / lonBands;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        
        const x = cosPhi * sinTheta;
        const y = cosTheta;
        const z = sinPhi * sinTheta;
        
        positions.push(cx + x * radius, cy + y * radius, cz + z * radius);
        normals.push(x, y, z);
        uvs.push(lon / lonBands, lat / latBands);
      }
    }
    
    // Create indices
    for (let lat = 0; lat < latBands; lat++) {
      for (let lon = 0; lon < lonBands; lon++) {
        const first = startIndex + (lat * (lonBands + 1) + lon);
        const second = first + lonBands + 1;
        
        indices.push(first, second, first + 1);
        indices.push(second, second + 1, first + 1);
      }
    }
  };

  // Helper function to add a cone (for ears)
  const addCone = (cx: number, cy: number, cz: number, radius: number, height: number, segments: number) => {
    const startIndex = positions.length / 3;
    
    // Bottom circle
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      positions.push(cx + x, cy, cz + z);
      normals.push(0, -1, 0);
      uvs.push(i / segments, 0);
    }
    
    // Tip of cone
    positions.push(cx, cy + height, cz);
    normals.push(0, 1, 0);
    uvs.push(0.5, 1);
    
    // Create faces
    const tipIndex = startIndex + segments;
    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      indices.push(startIndex + i, startIndex + next, tipIndex);
    }
  };

  // Build Pikachu
  // Body
  addSphere(0, 0, 0, 1.2, 16, 16);
  
  // Head
  addSphere(0, 1.2, 0, 0.9, 16, 16);
  
  // Left ear
  addCone(-0.6, 2.0, 0, 0.25, 0.8, 8);
  
  // Right ear
  addCone(0.6, 2.0, 0, 0.25, 0.8, 8);
  
  // Left arm
  addSphere(-1.2, 0.3, 0, 0.3, 8, 8);
  
  // Right arm
  addSphere(1.2, 0.3, 0, 0.3, 8, 8);
  
  // Left leg
  addSphere(-0.5, -1.2, 0, 0.35, 8, 8);
  
  // Right leg
  addSphere(0.5, -1.2, 0, 0.35, 8, 8);
  
  // Tail (simplified as a cone)
  addCone(-0.8, -0.2, -0.8, 0.2, 0.8, 6);
  
  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    uvs: new Float32Array(uvs),
    indices: new Uint16Array(indices)
  };
};

// WebGL wrapper component
const WebGLCanvas: React.FC<{ onContextCreated: (gl: WebGLRenderingContext, canvas: HTMLCanvasElement) => void }> = ({ onContextCreated }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    onContextCreated(gl, canvas);
  }, [onContextCreated]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
};

// Main 3D Pokemon Component
interface Pokemon3DProps {
  autoRotate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Pokemon3D: React.FC<Pokemon3DProps> = ({
  autoRotate = true,
  className = '',
  style = {}
}) => {
  const geometryRef = useRef(createPokemonGeometry());
  const programRef = useRef<WebGLProgram | null>(null);
  const buffersRef = useRef<{ [key: string]: WebGLBuffer | null }>({});
  const uniformsRef = useRef<{ [key: string]: WebGLUniformLocation | null }>({});
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const initWebGL = (gl: WebGLRenderingContext, canvas: HTMLCanvasElement) => {
    const geometry = geometryRef.current;

    // Set canvas size
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Create shader program
    const program = gl.createProgram();
    if (!program) return;

    // Compile shaders
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    };

    const vertex = compileShader(vertexShader, gl.VERTEX_SHADER);
    const fragment = compileShader(fragmentShader, gl.FRAGMENT_SHADER);
    
    if (!vertex || !fragment) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error');
      return;
    }

    gl.useProgram(program);
    programRef.current = program;

    // Create buffers
    const createBuffer = (data: Float32Array | Uint16Array, attributeName: string, size: number) => {
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      
      const attrib = gl.getAttribLocation(program, attributeName);
      gl.enableVertexAttribArray(attrib);
      gl.vertexAttribPointer(attrib, size, gl.FLOAT, false, 0, 0);
      
      buffersRef.current[attributeName] = buffer;
    };

    createBuffer(geometry.positions, 'position', 3);
    createBuffer(geometry.normals, 'normal', 3);
    createBuffer(geometry.uvs, 'uv', 2);

    // Index buffer
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW);
    buffersRef.current.indices = indexBuffer;

    // Get uniform locations
    uniformsRef.current = {
      modelMatrix: gl.getUniformLocation(program, 'modelMatrix'),
      viewMatrix: gl.getUniformLocation(program, 'viewMatrix'),
      projectionMatrix: gl.getUniformLocation(program, 'projectionMatrix'),
      uTime: gl.getUniformLocation(program, 'uTime')
    };

    // Enable depth testing
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.clearColor(0.1, 0.1, 0.2, 1.0);

    // Animation loop
    const animate = () => {
      if (!gl || !program) return;

      const time = (Date.now() - startTimeRef.current) / 1000;

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // Set up matrices
      const fieldOfView = 45 * Math.PI / 180;
      const aspect = gl.canvas.width / gl.canvas.height;
      const zNear = 0.1;
      const zFar = 100.0;
      
      const projectionMatrix = new Float32Array(16);
      projectionMatrix[0] = 1 / (Math.tan(fieldOfView / 2) * aspect);
      projectionMatrix[5] = 1 / Math.tan(fieldOfView / 2);
      projectionMatrix[10] = -(zFar + zNear) / (zFar - zNear);
      projectionMatrix[11] = -1;
      projectionMatrix[14] = -(2 * zFar * zNear) / (zFar - zNear);
      
      // View matrix (camera)
      const viewMatrix = new Float32Array(16);
      const cameraPosition = [3, 1, 5];
      const target = [0, 0, 0];
      const up = [0, 1, 0];
      
      // Simple look-at matrix
      const zAxis = [
        target[0] - cameraPosition[0],
        target[1] - cameraPosition[1],
        target[2] - cameraPosition[2]
      ];
      const zLen = Math.sqrt(zAxis[0]**2 + zAxis[1]**2 + zAxis[2]**2);
      zAxis[0] /= zLen; zAxis[1] /= zLen; zAxis[2] /= zLen;
      
      const xAxis = [
        up[1] * zAxis[2] - up[2] * zAxis[1],
        up[2] * zAxis[0] - up[0] * zAxis[2],
        up[0] * zAxis[1] - up[1] * zAxis[0]
      ];
      const xLen = Math.sqrt(xAxis[0]**2 + xAxis[1]**2 + xAxis[2]**2);
      xAxis[0] /= xLen; xAxis[1] /= xLen; xAxis[2] /= xLen;
      
      const yAxis = [
        zAxis[1] * xAxis[2] - zAxis[2] * xAxis[1],
        zAxis[2] * xAxis[0] - zAxis[0] * xAxis[2],
        zAxis[0] * xAxis[1] - zAxis[1] * xAxis[0]
      ];
      
      viewMatrix[0] = xAxis[0]; viewMatrix[4] = xAxis[1]; viewMatrix[8] = xAxis[2];
      viewMatrix[1] = yAxis[0]; viewMatrix[5] = yAxis[1]; viewMatrix[9] = yAxis[2];
      viewMatrix[2] = zAxis[0]; viewMatrix[6] = zAxis[1]; viewMatrix[10] = zAxis[2];
      viewMatrix[12] = -(xAxis[0]*cameraPosition[0] + xAxis[1]*cameraPosition[1] + xAxis[2]*cameraPosition[2]);
      viewMatrix[13] = -(yAxis[0]*cameraPosition[0] + yAxis[1]*cameraPosition[1] + yAxis[2]*cameraPosition[2]);
      viewMatrix[14] = -(zAxis[0]*cameraPosition[0] + zAxis[1]*cameraPosition[1] + zAxis[2]*cameraPosition[2]);
      viewMatrix[15] = 1;

      // Model matrix with rotation
      const modelMatrix = new Float32Array(16);
      const angle = autoRotate ? time * 0.5 : 0;
      modelMatrix[0] = Math.cos(angle);
      modelMatrix[2] = Math.sin(angle);
      modelMatrix[5] = 1;
      modelMatrix[8] = -Math.sin(angle);
      modelMatrix[10] = Math.cos(angle);
      modelMatrix[15] = 1;

      // Set uniforms
      gl.uniformMatrix4fv(uniformsRef.current.modelMatrix, false, modelMatrix);
      gl.uniformMatrix4fv(uniformsRef.current.viewMatrix, false, viewMatrix);
      gl.uniformMatrix4fv(uniformsRef.current.projectionMatrix, false, projectionMatrix);
      gl.uniform1f(uniformsRef.current.uTime, time);

      // Draw
      gl.drawElements(gl.TRIANGLES, geometry.indices.length, gl.UNSIGNED_SHORT, 0);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  return (
    <div 
      className={`relative overflow-hidden bg-gradient-to-b from-blue-900 to-purple-900 ${className}`}
      style={{ minHeight: '400px', ...style }}
    >
      <WebGLCanvas onContextCreated={initWebGL} />
      
      {/* Interactive hint */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-xs bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
        {autoRotate ? '✨ 3D Pikachu • Auto-rotating' : '🖱️ Drag to rotate'}
      </div>
    </div>
  );
};

// Gallery component
export const PokemonGallery: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gradient-to-b from-indigo-900 to-purple-900">
      <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-yellow-500/30">
        <h3 className="text-yellow-400 text-xl font-bold mb-2 text-center">Pikachu</h3>
        <div className="h-[300px]">
          <Pokemon3D autoRotate={false} />
        </div>
        <p className="text-gray-300 text-sm mt-2 text-center">Electric-type • Static ability</p>
      </div>
      
      <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-blue-500/30">
        <h3 className="text-blue-400 text-xl font-bold mb-2 text-center">Squirtle</h3>
        <div className="h-[300px] bg-gradient-to-b from-blue-800 to-blue-950 rounded-xl">
          <div className="w-full h-full flex items-center justify-center text-blue-300">
            <span className="text-4xl">💧</span>
          </div>
        </div>
        <p className="text-gray-300 text-sm mt-2 text-center">Water-type • Torrent ability</p>
      </div>
      
      <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-green-500/30">
        <h3 className="text-green-400 text-xl font-bold mb-2 text-center">Bulbasaur</h3>
        <div className="h-[300px] bg-gradient-to-b from-green-800 to-green-950 rounded-xl">
          <div className="w-full h-full flex items-center justify-center text-green-300">
            <span className="text-4xl">🌱</span>
          </div>
        </div>
        <p className="text-gray-300 text-sm mt-2 text-center">Grass/Poison • Overgrow ability</p>
      </div>
    </div>
  );
};

export default Pokemon3D;