/* AEON CEREALS — Three.js hero: a drifting field of golden grains
   with a slowly turning wireframe icosahedron, mouse parallax and scroll depth. */
(function () {
  'use strict';
  const canvas = document.getElementById('hero3d');
  if (!canvas || typeof THREE === 'undefined') return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b1f16, 0.045);
  const camera = new THREE.PerspectiveCamera(55, 1, .1, 100);
  camera.position.set(0, 0, 14);

  // Grain sprite texture (soft oval)
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 2, 32, 32, 30);
  grad.addColorStop(0, 'rgba(236,215,161,1)'); grad.addColorStop(.35, 'rgba(217,184,102,.9)'); grad.addColorStop(1, 'rgba(201,162,74,0)');
  g.fillStyle = grad; g.beginPath(); g.ellipse(32, 32, 30, 20, .6, 0, Math.PI * 2); g.fill();
  const tex = new THREE.CanvasTexture(c);

  const isMobile = window.innerWidth < 768;
  const N = isMobile ? 900 : 2200;
  const pos = new Float32Array(N * 3), vel = new Float32Array(N), sizes = new Float32Array(N), phase = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - .5) * 40;
    pos[i * 3 + 1] = (Math.random() - .5) * 24;
    pos[i * 3 + 2] = (Math.random() - .5) * 30 - 4;
    vel[i] = .002 + Math.random() * .006;
    sizes[i] = .12 + Math.random() * .3;
    phase[i] = Math.random() * Math.PI * 2;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTex: { value: tex }, uTime: { value: 0 }, uPR: { value: renderer.getPixelRatio() } },
    vertexShader: `attribute float aSize; uniform float uTime; uniform float uPR; varying float vA;
      void main(){ vec3 p = position; p.x += sin(uTime*.3 + p.y*.5)*.6; p.y += cos(uTime*.2 + p.x*.3)*.4;
      vec4 mv = modelViewMatrix * vec4(p,1.); gl_Position = projectionMatrix*mv;
      gl_PointSize = aSize * uPR * (260.0 / -mv.z); vA = smoothstep(-30.,6.,mv.z); }`,
    fragmentShader: `uniform sampler2D uTex; varying float vA; void main(){ vec4 t = texture2D(uTex, gl_PointCoord); gl_FragColor = vec4(t.rgb, t.a * (.25 + vA*.75)); }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  // Wireframe geometry (an abstract "seed")
  const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(3.6, 1), new THREE.MeshBasicMaterial({ color: 0xc9a24a, wireframe: true, transparent: true, opacity: .16 }));
  ico.position.set(isMobile ? 0 : 5.5, isMobile ? 4 : 1.2, -2);
  scene.add(ico);
  const ico2 = new THREE.Mesh(new THREE.IcosahedronGeometry(2.2, 0), new THREE.MeshBasicMaterial({ color: 0xecd7a1, wireframe: true, transparent: true, opacity: .1 }));
  ico2.position.set(isMobile ? 0 : 5.5, isMobile ? 4 : 1.2, -2);
  scene.add(ico2);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(5.2, .015, 8, 160), new THREE.MeshBasicMaterial({ color: 0xc9a24a, transparent: true, opacity: .35 }));
  ring.position.copy(ico.position); ring.rotation.x = Math.PI / 2.4;
  scene.add(ring);

  let mx = 0, my = 0, tx = 0, ty = 0, scroll = 0;
  window.addEventListener('mousemove', e => { tx = (e.clientX / window.innerWidth - .5); ty = (e.clientY / window.innerHeight - .5); }, { passive: true });
  window.addEventListener('scroll', () => { scroll = Math.min(window.scrollY / window.innerHeight, 1.2); }, { passive: true });

  function resize() {
    const w = canvas.clientWidth || window.innerWidth, h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize); resize();

  const clock = new THREE.Clock();
  let visible = true;
  new IntersectionObserver(en => { visible = en[0].isIntersecting; }, { threshold: 0 }).observe(canvas);

  function tick() {
    requestAnimationFrame(tick);
    if (!visible) return;
    const t = clock.getElapsedTime();
    mat.uniforms.uTime.value = t;
    const p = geo.attributes.position.array;
    for (let i = 0; i < N; i++) {
      p[i * 3 + 1] -= vel[i];
      if (p[i * 3 + 1] < -12) p[i * 3 + 1] = 12;
    }
    geo.attributes.position.needsUpdate = true;
    mx += (tx - mx) * .04; my += (ty - my) * .04;
    camera.position.x = mx * 1.6; camera.position.y = -my * 1.2 - scroll * 4;
    camera.position.z = 14 - scroll * 3;
    camera.lookAt(0, -scroll * 3, 0);
    if (!reduced) { ico.rotation.y = t * .12; ico.rotation.x = t * .08; ico2.rotation.y = -t * .2; ico2.rotation.z = t * .1; ring.rotation.z = t * .05; }
    renderer.render(scene, camera);
  }
  tick();
})();
