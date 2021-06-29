import React, { useContext, useEffect, useState } from "react"
import PlaceList from "../components/place-list"
import firebase from "@services/db"
import { LoadingContext } from "../hoc/loading"
import { ErrorMessageContext } from "../hoc/errorMessage"
import {
  getCollectionLimit,
  getMoreCollectionLimit,
  loadFormatData,
} from "../api/place"
import { LIMIT } from "../Constants"

export default function Index() {
  const [db] = useState(firebase.firestore())
  const [places, setPlaces] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const ref = getCollectionLimit(db, LIMIT)
  const { loading, setLoading } = useContext(LoadingContext)
  const { errorMessage, setErrorMessage } = useContext(ErrorMessageContext)

  useEffect(async () => {
    try {
      setErrorMessage("")
      setLoading(true)
      const data = await loadFormatData(ref)
      setPlaces(data)
    } catch (e) {
      setErrorMessage("Error getting documents")
      setPlaces([])
    }

    setLoading(false)
  }, [])

  console.log(places)

  const fetchMoreData = async key => {
    try {
      setErrorMessage("")
      setLoading(true)
      const ref = getMoreCollectionLimit(
        db,
        LIMIT,
        places[places.length - 1].createdAt
      )
      const data = await loadFormatData(ref)
      setPlaces([...places, ...data])
    } catch (e) {
      setHasMore(false)
      setLoading(false)
      setErrorMessage("Больше нечего не найдено")
    }
  }

  return (
    <>
      {places && (
        <PlaceList
          hasMore={hasMore}
          fetchMoreData={fetchMoreData}
          items={places}
        />
      )}
    </>
  )
}
