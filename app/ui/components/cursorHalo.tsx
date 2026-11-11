import {useEffect} from "react";

export default function CursorHalo() {
   useEffect(() => {
      const halo = document.getElementById('halo');
      window.addEventListener('mousemove', (e) => {
         if (!halo) return;
         
         halo.style.left = (e.clientX - halo.offsetWidth / 2) + 'px';
         halo.style.top = (e.clientY - halo.offsetHeight / 2) + 'px';
      });
   }, []);
   return (
      <div id={'halo'} className={'cursor-halo hidden lg:block'} style={{ pointerEvents: "none" }}/>
   )
}
