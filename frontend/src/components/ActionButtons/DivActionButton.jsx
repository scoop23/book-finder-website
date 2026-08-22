

const DivActionButton = ({ hover, setIsHovering }) => {
  console.log(hover)

  return (
    <div className="goo-layer"
      data-goo-ui
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={(e) => {
        if (e.relatedTarget?.closest?.("[data-goo-ui]")) return; // favorite-blob is a relatedtarget an is also the closest with the data-goo-ui // favorite-blob is a relatedtarget an is also the closest with the data-goo-ui.
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
        className="blob-group"
        data-goo-ui
        onClick={(e) => e.stopPropagation()}          // ← once HERE, not per-blob
        style={{
          position: "absolute",
          left: 13,
          top: hover ? -90 : 10,                      // ← animate the GROUP, blobs stay put inside
          display: "flex",
          gap: 20,
          padding: 12,                                // ← extends bounds 12px around everything
          transition: "0.3s all ease",
        }}
      >
        <div
          className="favorite-blob transition-all duration-200"
          data-goo-ui
          onClick={(e) => {
            e.stopPropagation()
          }}>
        </div>

        <div className="bookmark-blob"></div>

        <div className="share-blob"></div>

      </div >
    </div >
  )
}

export default DivActionButton
