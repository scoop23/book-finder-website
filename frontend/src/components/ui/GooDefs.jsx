const GooDefs = () => {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      {/* defs tag is like defining a variable though instead of a variable you define all kinds of things and you can use it by getting the id of the tag you created using url(#someId)*/}
      <defs>
        <filter id="goo" height="300%" y="-100%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" result='goo' values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 2 18 -7" />
          {/* these 2 creates a goo by attempting to increase the contrast of the gaussian blur. it takes the result which is blur then store it in "goo" */}
          <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
          <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
          <feOffset in="shadow" dx="1" dy="1" result="shadow" />
          {/* only put shadows up top  */}
          <feBlend in2="shadow" in="goo" result="goo" />

          <feBlend in2="goo" in="SourceGraphic" result="mix" />
          {/* original values : 1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 17 -7 */}
        </filter>
      </defs>
      {/* this is the goo effect very useful */}
    </svg>
  )
}

export default GooDefs
