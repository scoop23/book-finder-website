import React, { useRef, useEffect } from 'react'
import gsap from 'gsap';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import ActionButton from '../ActionButton';
import { Elastic } from 'gsap';
import SeeMoreButton from './SeeMoreButton';

const ActionButtons = ({ Ypos, Xpos, hover, sideBarRef, className }) => {
  const circleRefArray = useRef([]);
  // TODO : make the sideBarRef a copy of an svg to make goo animation more native
  // TODO : adjust the settting animation for the blobs

  const widGetArray = [
    LikeButton,
    BookmarkButton
  ]

  const timelineRef = useRef(null);


  useEffect(() => {
    const ellipses = circleRefArray.current.map(el => el.ellipse);
    const icons = circleRefArray.current.map(el => el.icon);

    // Set initial positions and hide icons
    ellipses.forEach((ellipse, i) => {
      const Cx = ellipse.getAttribute('cx');
      const Cy = ellipse.getAttribute('cy');
      gsap.set(icons[i], {
        attr: { transform: `translate(${Cx - 12}, ${Cy - 12})` },
        opacity: 0, // start hidden
      });
    });
  }, []);

  useEffect(() => {
    const ellipses = circleRefArray.current.map(el => el.ellipse);
    const rects = circleRefArray.current.map(el => el.rect);
    const icons = circleRefArray.current.map(el => el.icon);
    const tl = gsap.timeline({ paused: true });
    const sideBarTl = gsap.timeline({ paused: true });
    gsap.set(sideBarRef.current, { willChange: "transform" })

    tl.to(icons, {
      duration: 0.7,
      opacity: 1,
      ease: Elastic.easeInOut.config(0.8, 0.8),
      onUpdate: () => {
        ellipses.forEach((ellipse, i) => {
          const Cx = ellipse.getAttribute('cx')
          const Cy = ellipse.getAttribute('cy')
          gsap.set(icons[i], {
            attr: { transform: `translate(${Cx - 12}, ${Cy - 12})` },
          })
        })
      }
    }
    )
      .to(rects,
        { attr: { y: 16 }, duration: 0.5, ease: Elastic.easeInOut.config(0.05, 0.5) }
        , '<')
      .to(ellipses[2], { // animate only the last ellipse
        duration: 0.5,
        fill: "#000000"
      }, '<')
      .fromTo(ellipses, // can't do independent tween here, will ruin the animation.
        { attr: { cx: 10, rx: 1, ry: 1 } },
        // CY : -20.5
        { attr: { cy: -30.5, rx: 30, ry: 30 }, duration: 0.65, ease: Elastic.easeInOut.config(0.5, 0.5), stagger: 0.1, immediateRender: false }, '-=1'
      )
    sideBarTl.to(sideBarRef.current,
      { y: -6, duration: 0.5, ease: 'power2.out' }
    )

    timelineRef.current = { tl, sideBarTl };
  }, [])

  useEffect(() => {
    if (!timelineRef.current) return;

    if (hover) {
      timelineRef.current.tl.timeScale(1).play();
      timelineRef.current.sideBarTl.timeScale(6).play();
    } else {
      timelineRef.current.tl.timeScale(0.8).reverse();
      timelineRef.current.sideBarTl.timeScale(1.5).reverse();
    }

  }, [hover])

  return (
    <div className={`action-buttons flex ${className || ''}`} style={{
      position: 'absolute',
      top: Ypos,
      left: Xpos,
    }}>
      {
        widGetArray.map((icon, i) => ( // factory method
          <ActionButton key={i} hover={hover} noStroke={false} WidgetRef={sideBarRef} Ypos={-50} ref={(el) => circleRefArray.current[i] = el} Icon={icon} />
        ))
      }
      <ActionButton hover={hover} noStroke={true} fill={"#000000"} WidgetRef={sideBarRef} Ypos={-50} ref={(el) => circleRefArray.current[widGetArray.length] = el} Icon={SeeMoreButton} />
    </div>
  )
}

export default ActionButtons;
