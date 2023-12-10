import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import bookServices from "../../services/bookServices"
import sweetAlert from "../../helpers/sweetAlert"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import DataTable from "../../components/DataTable/DataTable"

export default function Books() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  const handleGetBooks = async () => {
    try {
      const { data } = await bookServices.listAllBooks()
      setBooks(data)
    } catch (error) {
      sweetAlert.error(t("error"))
    }
    setLoading(false)
  }

  useEffect(() => {
    handleGetBooks()
  }, [])

  return (
    <div>
      {loading && <LoadingSpinner />}
      <h1>Books</h1>
      <button onClick={() => navigate("/books/create")}>Create Book</button>
      <DataTable
        mapKey={"id"}
        tableRows={books}
        tableColumns={["title", "author", "categories", "price", "version", "olderVersions", "edtion", "isbn", "releaseDate", "brief",]}
      />
    </div>
  )
}
