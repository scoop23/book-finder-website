const DivActionButton = () => {

  return (
    <div className="goo-layer"
      style={{
        filter: "url(#goo)",
        position: "absolute",
        inset: 0,
        background: "red",
      }}>

      <div
        className="card-blob"
        style={{
          position: "absolute",
          width: "30px",
          height: "25px",
          borderRadius: 16,
          background: "#191920",
        }}
      />

      <div
        className="favorite-blob"
        style={{
          position: "absolute",
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "red",
          left: -20,
          top: 100,
        }}>
      </div>

      <div className="bookmark-blob" />

      <div className="share-blob" />

    </div >
  )
}

export default DivActionButton
