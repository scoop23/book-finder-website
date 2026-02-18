

const BookCardModal = ({ workData, isModal }) => {
  console.log(isModal ? "modal is open" : "modal ain't open")

  if (!isModal) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

    </div>
  )
}

export default BookCardModal;
