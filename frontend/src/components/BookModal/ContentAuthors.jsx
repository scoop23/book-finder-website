const ContentAuthors = ({ data }) => {
  console.log(data);
  return (
    <div className="authors text-gray-700 ">
      {data.map((a) => a.name).join(", ")}

    </div >
  )
}

export default ContentAuthors
