import React from "react"
import { Link } from "react-router-dom"
import dayjs from 'dayjs'
import './SavedGameCard.css'

const SavedGameCard = ({id, date, score, name}) => {
  return (
    <Link to={`/saved-games/${id}`}>
      <article className="more-info">
        <h3>Game ID: {id} | Player: {name}</h3>
        <h3>Played on {dayjs(date).format("MM/DD/YYYY")}</h3>
        <h4>Score: ${score}</h4>
        <p>Click for More Info</p>
      </article>
    </Link>
  )
}

export default SavedGameCard
