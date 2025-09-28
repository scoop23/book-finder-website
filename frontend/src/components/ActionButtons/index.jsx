  import React, { useEffect , useRef, useState } from 'react'
  import LikeButton from '../ui/LikeButton'
  import gsap, { Elastic } from 'gsap'
import { transform } from 'motion'

  const ActionButtons = ({ hover , WidgetRef , Ypos}) => {
    const CircleCxRef = useRef(null)
    const likeButtonGroupRef = useRef(null)
    const rectRef = useRef(null)
    const timelineRef = useRef();
    // animate the likButton icon on update because i cant group 
    // likeButton

    

    useEffect(() => {

      if(timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline()
      timelineRef.current = tl

      if(hover) {
        timelineRef.current = gsap.timeline()
        timelineRef.current.to(likeButtonGroupRef.current , 
          {
            duration : 1,
            ease : Elastic.easeInOut.config(0.8 , 0.6),
            onUpdate : () => {
              const Cx = CircleCxRef.current.getAttribute('cx')
              const Cy = CircleCxRef.current.getAttribute('cy')
              gsap.set(likeButtonGroupRef.current, {
                attr : { transform : `translate(${Cx - 12}, ${Cy - 12})` }
              })
            }
          }
        )
        .to(rectRef.current, 
          { attr : { y : 15 } , duration : 0.5 , ease : Elastic.easeInOut.config(0.05, 0.5)}
        , '-=1')
        .to(WidgetRef.current , 
          {duration : 1 , y : -5}
        , '-=2')
        gsap.fromTo(CircleCxRef.current,
          { attr: { cx: 10 } },
          { attr: { cy : -8 }, duration: 0.5, ease : Elastic.easeInOut.config(0.05, 0.5) } , '-=1'
        )

      } else {
        const tl = gsap.timeline();
        tl.to(CircleCxRef.current , { 
            attr : {cy : 50},
            onUpdate : () => {
              if (!CircleCxRef.current) return; // <-- extra safety
              const Cx = CircleCxRef.current.getAttribute('cx')
              const Cy = CircleCxRef.current.getAttribute('cy')
              gsap.set(likeButtonGroupRef.current, {
                attr : { transform : `translate(${Cx - 12}, ${Cy - 12})` }
              })
            }
          }
        )
        .to(rectRef.current, 
          { attr : { y : 22 } , duration : 0.1 , ease : 'power1.in'}
        , '-=1')
        .to(WidgetRef.current , 
          {duration : 1 , y : 0}
        , '-=2')
      }

      return () => {
        tl.kill()
      }

    }, [hover, WidgetRef])

    // useEffect(() => {
    //   gsap.to(likeButtonGroupRef.current, {
    //     ease : Elastic.easeInOut.config(0.8 , 0.6),
    //     duration : 1,
    //     onUpdate : () => { // while the tween is animating also run this function at the same time for every frame of the animation, Ultimately making it seamless as if the likeButton icon is the parent of the ellipse.
    //       const Cx = Number(CircleCxRef.current.getAttribute('cx'));
    //       const Cy = Number(CircleCxRef.current.getAttribute('cy'));
    //       gsap.set(likeButtonGroupRef.current , {
    //         attr : { transform : `translate(${Cx - 12} , ${Cy - 12})` }
    //       })
    //     }
    //   })
    // }, []);

    function onLikeClick() {
      const tl = gsap.timeline()
      tl.fromTo(
        CircleCxRef.current,
        { attr: { rx: 0, ry: 0 } },
        { duration: 1, attr: { rx: 30, ry: 30 }, ease: Elastic.easeOut.config(0.8, 0.6)}
      ).to(
        CircleCxRef.current,
        { duration: 0.8, attr: { rx: 30 }, ease: Elastic.easeOut.config(1.5, 0.8) } , '-=1'
      )
    }

    // useEffect(() => {
    //   gsap.set('#ring' , { attr : { cy : 50 } })
    //   // gsap.fromTo('#ring', 
    //   //   { attr: { cx: 10 } },
    //   //   { attr: { cy : -5 }, duration: 1, ease : Elastic.easeInOut.config(0.05, 0.5) }
    //   // )
    // }, [])

    return (
      <>
        <div className='action-buttons left-10 flex'
        style={{ top : `${Ypos}px` , position : 'absolute'}}> 

          <svg className='group' width={200} height={100} viewBox="50 0 100 100">
            {/* defs tag is like defining a variable though instead of a variable you define all kinds of things and you can use it by getting the id of the tag you created using url(#someId)*/}
              <defs>
                <filter id="goo" height="300%" y="-100%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 17 -7"/>
                </filter>
              </defs>
              
            {/* Group both circle and LikeButton */}
            <g transform="translate(50,50)"> {/* moves the group to SVG center */}
              <g id='group1' filter='url(#goo)'>
                <rect ref={rectRef} x={-40} y={20} width={100} height={40} fill="#51536c" />
                <ellipse ref={CircleCxRef} cx={10} rx={30} ry={30} fill="#51536c" />
              </g>
              {/* i placed the groupd LikeButton outside because i dont want it blurry, because of the filter */}
              <g ref={likeButtonGroupRef} transform={`translate(-2, -15)`}>
                <LikeButton size={24} clickAnimation={onLikeClick}/>
              </g>
            </g>

            
          </svg>

        </div>
      </>
    )
  }

  export default ActionButtons;