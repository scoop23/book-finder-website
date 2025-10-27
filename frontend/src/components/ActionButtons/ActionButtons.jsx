import React, { useRef, useEffect } from 'react'
import gsap from 'gsap';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import ActionButton from '../ActionButton';
import { Elastic } from 'gsap';
import SeeMoreButton from './SeeMoreButton';
import { stagger } from 'motion';

const ActionButtons = ({ Ypos, Xpos,  hover, sideBarRef, className }) => {
  const circleRefArray = useRef([]);
  
  const widGetArray = [
    LikeButton,
    BookmarkButton
  ]

  const timelineRef = useRef(null);
  const secondTimelineRef = useRef(null);
  
  useEffect(() => {

    if(timelineRef.current && secondTimelineRef.current) {
      timelineRef.current.kill();
      secondTimelineRef.current.kill();
    }

    const ellipses = circleRefArray.current.map(el => el.ellipse);
    const rects = circleRefArray.current.map(el => el.rect);
    const icons = circleRefArray.current.map(el => el.icon);
    const outlines = circleRefArray.current.map(el => el.outline)
    const rectOutlines = circleRefArray.current.map(el => el.rectangleOutline)
    console.log(rectOutlines)
    const tl = gsap.timeline()
    const tl2 = gsap.timeline();

    timelineRef.current = tl;
    secondTimelineRef.current = tl2;
    if(hover) {
      timelineRef.current.to(icons , {
          duration : 0.8,
          opacity : 1,
          ease : Elastic.easeInOut.config(0.8 , 0.8),
          onUpdate : () => {
            ellipses.forEach((ellipse , i) => {
              const Cx = ellipse.getAttribute('cx')
              const Cy = ellipse.getAttribute('cy')
                gsap.set(icons[i], {
                attr : { transform : `translate(${Cx - 12}, ${Cy - 12})` }
              })
            })
          } 
        }
      )
      .to(rects, 
        { attr : { y : 16 } , duration : 0.5 , ease : Elastic.easeInOut.config(0.05, 0.5)}
      , '-=1')
      .to(sideBarRef.current , 
        {duration : 1 , y : -6}
      , '-=2')
      .fromTo(ellipses, // can't do independent tween here, will ruin the animation.
        { attr: { cx: 10 , rx : 0, ry : 0} },
        { attr: { cy : -20.5, rx : 30, ry : 30}, duration: 0.7, ease : Elastic.easeInOut.config(0.5, 0.5), stagger : 0.1} , '-=1'
      )

    } else {
      secondTimelineRef.current.to(ellipses, {
          duration : 1,
          attr : {cy : 60},
          onUpdate : () => {
            if (!ellipses) return; // <-- extra safety
            ellipses.forEach((ellipse , i) => {
              const Cx = ellipse.getAttribute('cx')
              const Cy = ellipse.getAttribute('cy')
              gsap.set(icons[i], {
                attr : { transform : `translate(${Cx - 12}, ${Cy - 12})` }
              })
            })
          }
        }
      )
      .to(rects, 
        { attr : { y : 22 } , duration : 0.5 , ease : 'power1.in'}
      , '-=2')
      .to(sideBarRef.current , 
        {duration : 0.5 , y : 0} 
      , '-=2')
      .to(icons , {
        duration : 0.2,
        opacity : 0
      }, '-=1')
    }
  
  }, [hover])

  return (
    <div className={`action-buttons flex ${className || ''}`}  style={{
      position : 'absolute',
      top : Ypos,
      left : Xpos,
    }}>
      {
        widGetArray.map((icon , i) => ( // factory method
          <ActionButton hover={hover} noStroke={false} WidgetRef={sideBarRef} Ypos={-50} ref={(el) => circleRefArray.current[i] = el} Icon={icon}/>
        ))
      }
      <ActionButton hover={hover} noStroke={true} fill={"#000000"} WidgetRef={sideBarRef} Ypos={-50} ref={(el) => circleRefArray.current[widGetArray.length] = el} Icon={SeeMoreButton}/>
    </div>
  )
}

export default ActionButtons