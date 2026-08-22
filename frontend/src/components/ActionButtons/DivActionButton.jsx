const DivActionButton = () => {

  return (
    <div className="goo-layer"
      style={{
        filter: "url(#goo)",
        position: "absolute",
        inset: 0,
        background: "lightgreen",
      }}>

      <div
        className="card-blob"
        style={{
          position: "absolute",
          borderRadius: 16,
          background: "#191920",
        }}
      />

      <div
        className="favorite-blob transition-all duration-200"
        style={{
          position: "absolute",
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#191920",
          left: -30,
          top: 100,
        }}>
      </div>

      <div className="bookmark-blob" />

      <div className="share-blob" />

    </div >
  )
}

export default DivActionButton
