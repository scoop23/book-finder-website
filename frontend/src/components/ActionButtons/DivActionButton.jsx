

const DivActionButton = ({ hover, setIsHovering }) => {
  console.log(hover)

  return (
    <div className="goo-layer"
      data-goo-ui
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={(e) => {
        if (e.relatedTarget?.closest?.("[data-goo-ui]")) return;
        setIsHovering(false);
      }}
      style={{
        filter: "url(#goo)",
        position: "absolute",
        inset: 0,
        background: "#22222e",
        borderRadius: 16,
        zIndex: -10,
      }}>

      <div
        className="card-blob"
        style={{
          position: "absolute",
          borderRadius: 16,
          background: "#22222e",
        }}
      />

      <div
        className="favorite-blob transition-all duration-200"
        data-goo-ui
        onClick={(e) => {
          e.stopPropagation()
        }}
        style={{
          position: "absolute",
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#22222e",
          left: 30,
          top: hover ? -75 : 10,
          transition: "0.3s all ease",
        }}>
      </div>

      <div className="bookmark-blob" />

      <div className="share-blob" />

    </div >
  )
}

export default DivActionButton
