  import React, { forwardRef, useEffect , useImperativeHandle, useRef, useState } from 'react'
  import gsap, { Elastic } from 'gsap'

  const ActionButton = forwardRef(({ className , noStroke, fill , hover , WidgetRef , Ypos, Icon} , ref) => {
    const CircleCxRef = useRef(null)
    const likeButtonGroupRef = useRef(null)
    const rectRef = useRef(null)
    const svgRef = useRef(null);
    // animate the likButton icon on update because i cant group 
    // likeButton

    useEffect(() => { // set all positon first
      gsap.set(rectRef.current, { attr: { y: 22 } });
      gsap.set(CircleCxRef.current, { attr: { cy: 60 } });
      gsap.set(WidgetRef.current, { y: 0 }); // the big square
    }, [WidgetRef]);


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
      const tl = gsap.timeline();
      tl.fromTo(
        CircleCxRef.current,
        { attr: { rx: 0, ry: 0 } },
        { duration: 1, attr: { rx: 30, ry: 30 }, ease: Elastic.easeOut.config(0.8, 0.6)}
      ).to(
        CircleCxRef.current,
        { duration: 0.8, attr: { rx: 30 }, ease: Elastic.easeOut.config(1.5, 0.8) } , '-=1'
      )
    }

    useImperativeHandle(ref , () => ({
      svg : svgRef.current,
      rect : rectRef.current,
      ellipse : CircleCxRef.current,
      icon : likeButtonGroupRef.current,
    }), [])

    return (
      <>
        <div className={`action-button left-10 flex ${className || ''}`}
         ref={svgRef}
        style={{ top : `${Ypos}px` }}> 

          <svg className='group' width={80} height={75} viewBox="20 0 80 75">
            {/* defs tag is like defining a variable though instead of a variable you define all kinds of things and you can use it by getting the id of the tag you created using url(#someId)*/}
              <defs>
                <filter id="goo" height="300%" y="-100%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 2 17 -7"/> 
                  {/* original values : 1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 17 -7 */}
                </filter>
              </defs>
              {/* this is the goo effect very useful */}
              
            {/* Group both circle and LikeButton */}
            <g transform="translate(50,50)"> {/* moves the group to SVG center */}
              <g id='group1' filter='url(#goo)'>
                <rect ref={rectRef} x={-40} y={20} width={100} height={40} fill='#444446' />
                <ellipse stroke={`${noStroke ? '' : 'white'}`} strokeWidth={0.1} ref={CircleCxRef} cx={10} rx={30} ry={30} fill={`${fill ? fill : '#444446'}`} />
              </g>
              {/* i placed the groupd LikeButton outside because i dont want it blurry, because of the filter */}
              <g ref={likeButtonGroupRef} transform={`translate(-2, -15)`}>
                {/* <LikeButton size={24} clickAnimation={onLikeClick}/> */}
                {Icon && <Icon size={24} clickAnimation={onLikeClick} />}
              </g>
            </g>

            
          </svg>

        </div>
      </>
    )
  })
export default ActionButton;