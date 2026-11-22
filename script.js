/* Christmas Night interactive invite – original hand-drawn canvas pixel art.
   No frameworks, external images, remote fonts, trackers, or back end required. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const choose = (a,b,t) => Math.round(a + (b-a)*t);
  const pixel = (ctx,x,y,w,h,color) => {ctx.fillStyle=color;ctx.fillRect(x,y,w,h);};
  const noise = (x,y,z=0) => {
    let n=(x*18341+y*8579+z*7193+137)>>>0;
    n^=n<<13;n^=n>>>17;n^=n<<5;return (n>>>0)%1000;
  };

  function drawTree(ctx,cx,by,scale=1) {
    ctx.save();ctx.translate(cx,by);ctx.scale(scale,scale);
    pixel(ctx,-2,-5,4,7,'#633d26');
    pixel(ctx,-5,-11,10,7,'#0d392e');
    pixel(ctx,-7,-8,14,3,'#134938');
    pixel(ctx,-5,-15,10,6,'#195642');
    pixel(ctx,-3,-20,6,7,'#216b4c');
    pixel(ctx,-1,-23,2,5,'#2f8653');
    pixel(ctx,-6,-10,4,1,'#d8eee0');pixel(ctx,-4,-15,4,1,'#ecf7ee');pixel(ctx,-2,-20,3,1,'#e8f2ee');
    pixel(ctx,2,-12,2,2,'#ec4b56');pixel(ctx,-4,-9,2,2,'#f8be65');pixel(ctx,0,-17,2,2,'#f6d469');
    ctx.restore();
  }

  function drawHero() {
    const canvas=$('heroCanvas');if(!canvas)return;
    const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;
    pixel(c,0,0,320,140,'#183552');
    pixel(c,0,69,320,71,'#4c7683');
    for(let i=0;i<100;i++){
      let x=noise(i,9)%320,y=noise(i,7)%99;
      pixel(c,x,y,noise(i,11)%4===0?2:1,1,noise(i,3)%5===0?'#f9daa0':'#bce3e8');
    }
    pixel(c,252,17,22,22,'#ffe6a1');pixel(c,248,21,30,14,'#ffe6a1');pixel(c,249,18,3,3,'#fff4c8');
    for(let i=0;i<24;i++){
      let x=i*15-4, y=89+(noise(i,22)%13);
      pixel(c,x,y,19,45,'#90b5b3');pixel(c,x+3,y-3,15,4,'#f7f2e6');
    }
    // Snowy hillside in block steps.
    for(let x=0;x<320;x+=8){
      let ridge=103+Math.round(5*Math.sin(x*.035))+((noise(x,90)%3)*2);
      pixel(c,x,ridge,8,140-ridge,'#e2f2e8');pixel(c,x,ridge+4,8,140-ridge-4,'#c6e0d7');
    }
    const lights=['#ef5669','#ffe06e','#70e1bf','#eeab62','#e5e8ff'];
    for(let i=0;i<23;i++){
      let x=i*14+4,y=12+Math.round(8*Math.sin(i*.4));
      pixel(c,x,y,2,3,lights[i%lights.length]);
      if(i<22)pixel(c,x+2,y-1,12,1,'#b68d66');
    }
    // Front snowy spruce trees.
    drawTree(c,48,135,3.2);drawTree(c,277,137,3.6);drawTree(c,22,135,2.5);drawTree(c,304,140,2.4);
    // Cabin: timber siding with a snow-capped, stair-step roof.
    pixel(c,122,78,115,51,'#a16b49');pixel(c,122,80,115,6,'#744932');
    for(let y=90;y<130;y+=8){pixel(c,122,y,115,2,'#774830');}
    for(let x=120;x<240;x+=12)pixel(c,x,80,2,49,'#b7865a');
    for(let i=0;i<9;i++){
      pixel(c,114+i*6,86-i*5,132-i*12,5,'#774239');
      pixel(c,114+i*6,83-i*5,132-i*12,3,'#f4f0df');
    }
    pixel(c,212,47,15,34,'#9a483d');pixel(c,210,44,19,5,'#fff4e6');
    pixel(c,216,41,9,4,'#6a2e35');
    // Windows + front door.
    pixel(c,138,94,26,24,'#452d2b');pixel(c,141,97,20,18,'#ffe39b');
    pixel(c,150,97,2,18,'#8b5537');pixel(c,141,104,20,2,'#8b5537');
    pixel(c,198,94,25,24,'#452d2b');pixel(c,201,97,19,18,'#ffe39b');
    pixel(c,209,97,2,18,'#8b5537');pixel(c,201,104,19,2,'#8b5537');
    pixel(c,172,99,20,30,'#5e3430');pixel(c,174,101,16,27,'#84503c');
    pixel(c,185,115,2,2,'#ffeab4');
    // Santa hat peeking out of chimney.
    pixel(c,217,35,7,8,'#df3d4a');pixel(c,214,38,12,3,'#fff2dd');pixel(c,218,32,4,3,'#ed4353');pixel(c,222,30,4,4,'#fff1dc');
    // Foreground gift boxes.
    pixel(c,79,120,15,13,'#ce3646');pixel(c,85,120,3,13,'#f2cc71');pixel(c,79,124,15,2,'#f2cc71');
    pixel(c,236,124,13,11,'#24765a');pixel(c,241,124,3,11,'#f5cb77');pixel(c,236,128,13,2,'#f5cb77');
    for(let x=0;x<320;x+=9){if(noise(x,77)%4===0)pixel(c,x,133,2,2,'#fff9ec');}
  }

  function countdown() {
    const el=$('countdown');if(!el)return;
    const target=new Date('2026-12-18T18:30:00-05:00').getTime();
    const delta=target-Date.now();
    if(delta<=0){el.textContent='IT’S CHRISTMAS PARTY TIME!';return;}
    const days=Math.floor(delta/86400000);
    const hours=Math.floor((delta%86400000)/3600000);
    const mins=Math.floor((delta%3600000)/60000);
    el.textContent=`PARTY STARTS IN ${days}D ${hours}H ${mins}M`;
  }

  // Gentle original music-box loop. Audio is requested on load, then unlocked
  // on the first interaction if the browser's autoplay policy requires it.
  let audioCtx=null,musicTimer=null,musicStarted=false,beat=0,nextBeatTime=0;
  // "Deck the Halls" (traditional Welsh carol, public-domain melody),
  // gently arranged as a looping 8-bit music-box tune.
  // Each item is [MIDI note, duration in beats]; null is a quiet rest.
  const melody=[
    [79,1],[77,.5],[76,.5],[74,1],[72,1],[74,.5],[76,.5],[72,1],
    [74,.5],[76,.5],[77,.5],[74,.5],[76,1],[74,.5],[72,.5],[71,.5],[72,1.5],
    [79,1],[77,.5],[76,.5],[74,1],[72,1],[74,.5],[76,.5],[72,1],
    [74,.5],[76,.5],[77,.5],[74,.5],[76,1],[74,.5],[72,.5],[71,.5],[72,1.5]
  ];
  const bass=[48,55,53,48,48,55,53,48];
  const midiHz=midi=>440*Math.pow(2,(midi-69)/12);
  function getAudio(){
    try {
      if(!audioCtx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;audioCtx=new AC();}
      return audioCtx;
    }catch(_){return null;}
  }
  function musicBell(midi,when,duration=.68,volume=.015){
    const a=getAudio();if(!a||midi===null)return;
    const g=a.createGain(),o=a.createOscillator(),harmonic=a.createOscillator(),hg=a.createGain();
    o.type='sine';o.frequency.setValueAtTime(midiHz(midi),when);
    harmonic.type='sine';harmonic.frequency.setValueAtTime(midiHz(midi)*2.002,when);
    hg.gain.value=.12;
    g.gain.setValueAtTime(.00001,when);
    g.gain.linearRampToValueAtTime(volume,when+.022);
    g.gain.exponentialRampToValueAtTime(.00001,when+duration);
    o.connect(g);harmonic.connect(hg);hg.connect(g);g.connect(a.destination);
    o.start(when);harmonic.start(when);
    o.stop(when+duration+.03);harmonic.stop(when+duration+.03);
  }
  function scheduleMusic(){
    const a=audioCtx;if(!a||a.state!=='running')return;
    // Keep audio scheduling in step with each note's length.
    while(nextBeatTime<a.currentTime+.15){
      const [note,length]=melody[beat%melody.length];
      const beatSeconds=.42;
      if(note!=null)musicBell(note,nextBeatTime,Math.max(.18,length*beatSeconds*.90),.012);
      if(beat%4===0){
        musicBell(bass[Math.floor(beat/4)%bass.length],nextBeatTime,1.15,.0045);
      }
      nextBeatTime+=length*beatSeconds;beat++;
    }
  }
  function requestMusic(){
    const a=getAudio();if(!a)return;
    a.resume().then(()=>{
      if(a.state!=='running')return;
      if(musicStarted)return;
      musicStarted=true;nextBeatTime=a.currentTime+.03;
      scheduleMusic();musicTimer=setInterval(scheduleMusic,70);
    }).catch(()=>{});
  }
  // The background music stays enabled: no switch-off control.
  requestMusic();
  window.addEventListener('pageshow',requestMusic);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)requestMusic();});
  ['pointerdown','keydown','touchstart'].forEach(type=>document.addEventListener(type,requestMusic,{capture:true,passive:true}));

  // The reference invitation links publicly to these four sound files.
  // Try its original click / walking audio where reachable, with a local
  // synthesized fallback for offline browsing or slow/unavailable downloads.
  // See README.txt for attribution.
  const referenceSound={};
  try {
    ['click','move','bump','success'].forEach(kind=>{
      const sound=new Audio(`https://arakere-thejaswini.github.io/wedding-invite/audio/${kind}.mp3`);
      sound.preload='auto';sound.volume=kind==='click'?.28:.24;
      referenceSound[kind]=sound;
    });
  } catch(_) {}
  function externalSound(kind, fallback){
    const source=referenceSound[kind];
    if(!source||source.readyState<2){fallback();return;}
    try {
      // One shared reference sound is enough for the short, successive steps.
      source.pause();source.currentTime=0;
      source.play().catch(fallback);
    }catch(_){fallback();}
  }

  // Gentle local retro sound effects for reliable offline playback.
  function shortTone(freq,start,duration,volume,shape='square',endFreq=null){
    const a=getAudio();if(!a||a.state!=='running')return;
    const osc=a.createOscillator(),g=a.createGain();
    osc.type=shape;osc.frequency.setValueAtTime(freq,start);
    if(endFreq)osc.frequency.exponentialRampToValueAtTime(endFreq,start+duration);
    g.gain.setValueAtTime(volume,start);
    g.gain.exponentialRampToValueAtTime(.0001,start+duration);
    osc.connect(g);g.connect(a.destination);osc.start(start);osc.stop(start+duration+.002);
  }
  function playClick(){externalSound('click',()=>{
    const a=getAudio();if(!a||a.state!=='running')return;
    shortTone(860,a.currentTime,.018,.04,'square',520);
    shortTone(440,a.currentTime+.022,.014,.017,'triangle',260);
  });}
  let noiseBuffer=null;
  function playStep(blocked=false){
    externalSound(blocked?'bump':'move',()=>{
    const a=getAudio();if(!a||a.state!=='running')return;
    const t=a.currentTime;
    if(blocked){shortTone(164,t,.075,.065,'triangle',98);return;}
    // Soft, earthy 8-bit crunch over a low 'step' thump.
    if(!noiseBuffer){
      noiseBuffer=a.createBuffer(1,Math.ceil(a.sampleRate*.12),a.sampleRate);
      const d=noiseBuffer.getChannelData(0);
      for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);
    }
    const source=a.createBufferSource(),filter=a.createBiquadFilter(),gain=a.createGain();
    source.buffer=noiseBuffer;filter.type='lowpass';filter.frequency.value=750;
    gain.gain.setValueAtTime(.028,t);
    gain.gain.exponentialRampToValueAtTime(.0001,t+.095);
    source.connect(filter);filter.connect(gain);gain.connect(a.destination);
    source.start(t);source.stop(t+.1);
    shortTone(124,t,.08,.025,'triangle',91);
    });
  }
  function playWin(){externalSound('success',()=>{
    const a=getAudio();if(!a||a.state!=='running')return;
    const t=a.currentTime;
    shortTone(523.25,t,.11,.05,'square');
    shortTone(659.25,t+.10,.11,.05,'square');
    shortTone(783.99,t+.20,.14,.05,'square');
    shortTone(1046.5,t+.34,.26,.06,'triangle');
    shortTone(783.99,t+.34,.22,.03,'triangle');
  });}
  // A normal mouse-like click for every non-direction button/link/form choice.
  document.addEventListener('click',event=>{
    if(event.target.closest('[data-move]'))return;
    const control=event.target.closest('button,a,.choice');
    if(control&&!control.disabled)playClick();
  },{capture:true});
  // Give the short click enough time to sound before changing pages.
  document.addEventListener('click',event=>{
    const anchor=event.target.closest('a[href]');
    if(!anchor||event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;
    const href=anchor.getAttribute('href');
    if(href!=='rsvp.html'&&href!=='index.html')return;
    event.preventDefault();setTimeout(()=>{location.href=anchor.href;},105);
  });
  window.addEventListener('pagehide',()=>{
    clearInterval(musicTimer);musicTimer=null;musicStarted=false;
    if(audioCtx){audioCtx.close().catch(()=>{});audioCtx=null;}
  });

  const LEVEL=[
    '############',
    '#S..T......#',
    '#.B.T..BB..#',
    '#...T...B..#',
    '#....BBB...#',
    '#.....G....#',
    '#..BB......#',
    '#.........B#',
    '#.BB.....BB#',
    '#..........#',
    '############'
  ];
  const TW=16;
  let player={x:1,y:1},won=false,steps=0,flash=0;
  const c=$('maze'),status=$('gameStatus');
  let ctx;
  if(c){ctx=c.getContext('2d');ctx.imageSmoothingEnabled=false;}
  function grass(x,y,seed){
    pixel(ctx,x,y,16,16,'#96734d');
    pixel(ctx,x+1,y+1,14,14,seed%4===0?'#67b74d':'#59a53e');
    pixel(ctx,x+1,y+1,14,2,'#7ecc58');
    pixel(ctx,x+1,y+13,14,2,'#448d34');
    for(let k=0;k<19;k++){
      const xx=x+2+(noise(seed,k,1)%12),yy=y+2+(noise(seed,k,2)%11);
      pixel(ctx,xx,yy,1,1,['#77c755','#357c2e','#6bbb43','#a3d15c'][noise(seed,k,3)%4]);
    }
  }
  function borderTile(x,y,seed){
    pixel(ctx,x,y,16,16,'#72583d');
    pixel(ctx,x+1,y+1,14,14,'#174d3d');
    for(let j=0;j<6;j++){
      let xx=x+1+(noise(seed,j,6)%11),yy=y+1+(noise(seed,j,9)%12);
      pixel(ctx,xx,yy,4,3,['#266b45','#358958','#1c603f','#4b9864'][j%4]);
      pixel(ctx,xx,yy,2,1,'#70b371');
    }
    pixel(ctx,x+2,y+2,4,2,'#448c5d');
    pixel(ctx,x+1,y+13,14,2,'#153d30');
  }
  function bushTile(x,y,seed){
    grass(x,y,seed);
    pixel(ctx,x+3,y+10,11,3,'#235b31');
    pixel(ctx,x+1,y+7,5,5,'#286f34');pixel(ctx,x+5,y+4,7,9,'#338541');pixel(ctx,x+10,y+6,5,6,'#1f6438');
    pixel(ctx,x+4,y+5,5,4,'#4ba145');pixel(ctx,x+7,y+3,4,4,'#69b94c');
    pixel(ctx,x+2,y+8,3,2,'#6cbd51');pixel(ctx,x+10,y+8,3,3,'#4c9b43');
    pixel(ctx,x+6,y+6,2,2,seed%2?'#eb5751':'#f0ce55');
    pixel(ctx,x+11,y+10,2,2,'#d63f50');
    pixel(ctx,x+3,y+12,4,1,'#153d30');
  }
  function treeTile(x,y,seed){
    grass(x,y,seed);
    pixel(ctx,x+7,y+11,3,4,'#67462b');
    pixel(ctx,x+4,y+8,10,5,'#1d643e');
    pixel(ctx,x+3,y+10,12,3,'#165238');
    pixel(ctx,x+5,y+5,8,5,'#267f43');
    pixel(ctx,x+7,y+2,5,6,'#348a47');
    pixel(ctx,x+9,y+1,2,3,'#60ad53');
    pixel(ctx,x+5,y+9,3,2,'#f9eee1');
    pixel(ctx,x+7,y+6,3,1,'#f9eee1');
    pixel(ctx,x+10,y+9,2,2,'#f0c257');
    pixel(ctx,x+7,y+11,2,2,'#e44a53');
  }
  function chimneyTile(x,y){
    grass(x,y,71);
    // tiny pixel holiday cottage / chimney that Santa must enter
    pixel(ctx,x+3,y+8,11,7,'#e5c48e');
    pixel(ctx,x+2,y+6,13,3,'#914e35');
    pixel(ctx,x+4,y+4,9,3,'#b46d41');
    pixel(ctx,x+6,y+2,6,3,'#df9c56');
    pixel(ctx,x+11,y+1,3,5,'#ad433d');
    pixel(ctx,x+11,y+1,4,1,'#fff5e6');
    pixel(ctx,x+4,y+5,8,1,'#fff0dd');
    pixel(ctx,x+5,y+9,3,3,'#f7d26d');
    pixel(ctx,x+10,y+9,3,6,'#55372d');
    pixel(ctx,x+9,y+14,5,1,'#604734');
    pixel(ctx,x+1,y+1,2,2,'#fff2b6');pixel(ctx,x+14,y+4,2,2,'#fff2b6');
  }
  function santaTile(x,y){
    // 12x14 sprite, 1px art, shadow, red cap, boots, white beard.
    pixel(ctx,x+2,y+14,13,1,'#325b32');
    pixel(ctx,x+5,y+11,3,3,'#3b3e40');pixel(ctx,x+10,y+11,3,3,'#3b3e40');
    pixel(ctx,x+4,y+7,10,6,'#c83544');
    pixel(ctx,x+2,y+8,3,4,'#ba3442');pixel(ctx,x+13,y+8,2,4,'#ba3442');
    pixel(ctx,x+3,y+10,2,2,'#ffdeac');pixel(ctx,x+13,y+10,2,2,'#ffdeac');
    pixel(ctx,x+4,y+10,10,1,'#f8eddf');
    pixel(ctx,x+7,y+9,3,3,'#432b25');pixel(ctx,x+8,y+9,2,2,'#e7bd56');
    pixel(ctx,x+5,y+3,9,6,'#f1bb92');
    pixel(ctx,x+5,y+6,9,4,'#fbf4df');pixel(ctx,x+8,y+8,3,2,'#f7e7d6');
    pixel(ctx,x+7,y+5,1,1,'#3a302d');pixel(ctx,x+11,y+5,1,1,'#3a302d');
    pixel(ctx,x+9,y+6,2,1,'#dc7772');
    pixel(ctx,x+4,y+1,10,3,'#d33846');pixel(ctx,x+5,y,7,2,'#e23e4b');
    pixel(ctx,x+3,y+3,12,2,'#fff4e8');pixel(ctx,x+14,y+1,2,2,'#fff8eb');
  }
  function drawMaze() {
    if(!ctx)return;
    ctx.clearRect(0,0,192,176);
    for(let row=0;row<11;row++)for(let col=0;col<12;col++){
      let x=col*TW,y=row*TW,kind=LEVEL[row][col],seed=col*17+row*103;
      if(kind==='#')borderTile(x,y,seed);
      else if(kind==='B')bushTile(x,y,seed);
      else if(kind==='T')treeTile(x,y,seed);
      else if(kind==='G')chimneyTile(x,y);
      else grass(x,y,seed);
    }
    let x=player.x*TW,y=player.y*TW;
    if(won){pixel(ctx,x+1,y+1,14,14,'#fff09c');}
    santaTile(x,y);
  }
  const dirs={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
  function move(direction){
    if(!ctx||won)return;
    let d=dirs[direction];if(!d)return;
    let xx=player.x+d[0],yy=player.y+d[1];
    const t=LEVEL[yy]?.[xx];
    if(!t||t==='#'||t==='B'||t==='T'){
      playStep(true);status.textContent='A tree blocks the path. Try another way!';return;
    }
    playStep();player={x:xx,y:yy};steps++;drawMaze();
    if(t==='G'){
      won=true;status.textContent=`Chimney found in ${steps} moves! Your RSVP is unlocked.`;
      playWin();
      document.querySelectorAll('.dpad button').forEach(b=>b.disabled=true);
      window.setTimeout(openWin,350);
    } else status.textContent=`${steps} blocks traveled.`;
  }
  let lastFocus=null;
  function openWin(){if(!won)return;lastFocus=document.activeElement;$('winOverlay').hidden=false;$('guestName').focus();}
  function closeWin(){$('winOverlay').hidden=true;const back=document.querySelector('.back-button a');if(back)back.focus();}
  if(c){
    drawMaze();
    document.querySelectorAll('[data-move]').forEach(b=>b.addEventListener('click',()=>move(b.dataset.move)));
    $('closeWin').addEventListener('click',closeWin);
    $('winOverlay').addEventListener('click',e=>{if(e.target===$('winOverlay'))closeWin();});
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&!$('winOverlay').hidden){closeWin();return;}
      if(!$('winOverlay').hidden)return;
      if(['INPUT','TEXTAREA'].includes(document.activeElement?.tagName))return;
      const k={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right'}[e.key];
      if(k){e.preventDefault();move(k);}
    });
    let start=null;
    c.addEventListener('pointerdown',e=>{start={x:e.clientX,y:e.clientY};c.setPointerCapture?.(e.pointerId);});
    c.addEventListener('pointerup',e=>{
      if(!start||won)return;
      const dx=e.clientX-start.x,dy=e.clientY-start.y;
      if(Math.max(Math.abs(dx),Math.abs(dy))>24){move(Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up'));start=null;return;}
      const rect=c.getBoundingClientRect(),x=Math.floor((e.clientX-rect.left)/rect.width*12),y=Math.floor((e.clientY-rect.top)/rect.height*11);
      if(x===player.x+1&&y===player.y)move('right');
      else if(x===player.x-1&&y===player.y)move('left');
      else if(y===player.y+1&&x===player.x)move('down');
      else if(y===player.y-1&&x===player.x)move('up');
      start=null;
    });
    let selectedRsvp=null;
    document.querySelectorAll('.rsvp-choice').forEach(button=>{
      button.addEventListener('click',()=>{
        const response=button.dataset.response;
        selectedRsvp=response;
        $('saveRsvp').disabled=false;
        $('saveRsvp').textContent='SAVE RSVP';
        document.querySelectorAll('.rsvp-choice').forEach(choice=>{
          choice.classList.toggle('selected',choice===button);
          choice.setAttribute('aria-pressed',String(choice===button));
        });
        const feedback=$('formFeedback');
        feedback.textContent=response==='Hard pass'
          ? 'cool the grinch is coming for you'
          : "lessgoo! you're on the nice list ;)";
      });
    });
    $('saveRsvp').addEventListener('click',async()=>{
      if(!selectedRsvp)return;
      const nameField=$('guestName');
      if(!nameField.value.trim()){
        nameField.setCustomValidity('Please enter your name to save your RSVP.');
        nameField.reportValidity();
        nameField.focus();
        nameField.setCustomValidity('');
        return;
      }
      const saveButton=$('saveRsvp');
      const feedback=$('formFeedback');
      const submission={
        name:nameField.value.trim(),
        response:selectedRsvp,
        event:'Christmas Night — December 18, 2026 at 6:30 PM',
        _subject:'New Christmas Night RSVP'
      };
      saveButton.disabled=true;
      saveButton.textContent='SENDING...';
      feedback.textContent='Sending your RSVP...';
      try {
        const result=await fetch('https://formspree.io/f/mppdyqag',{
          method:'POST',
          headers:{'Content-Type':'application/json','Accept':'application/json'},
          body:JSON.stringify(submission)
        });
        const data=await result.json().catch(()=>null);
        if(!result.ok || (data && data.ok===false)){
          const message=data?.errors?.map(error=>error.message).filter(Boolean).join(' ');
          throw new Error(message||'Form submission failed.');
        }
        try {localStorage.setItem('christmasNightRsvp',JSON.stringify({...submission,updatedAt:new Date().toISOString()}));}catch(_){}
        saveButton.textContent='RSVP SENT';
        feedback.textContent='RSVP sent!';
        closeWin();
      } catch(error) {
        feedback.textContent='Could not send your RSVP. Please try again.';
        saveButton.textContent='RETRY SAVE RSVP';
        saveButton.disabled=false;
      }
    });
  }
  drawHero();countdown();
  if($('countdown'))setInterval(countdown,60000);
})();
