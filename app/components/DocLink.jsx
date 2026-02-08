



const DocLink = ({doc}) => {

    console.log("Logging doc from DocLink component", doc)

    // const year = Object.keys(doc)[0]
    // const link = Object.values(doc)[0]

  return (
    <div>
        <a className="py-3 px-5 bg-green-500 text-gray-100 rounded" href={doc.url} download target="blank">T4A - {doc.year}</a>
    </div>
    )
}

export default DocLink