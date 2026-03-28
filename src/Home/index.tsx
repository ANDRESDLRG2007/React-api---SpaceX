import "./style.css"
import { useState, useEffect } from 'react'

//https://api.spacexdata.com/v4/rockets

interface Rocket {
  id: string
  name: string
  type: string
  active: boolean
  stages: number
  boosters: number
  cost_per_launch: number
  success_rate_pct: number
  first_flight: string
  country: string
  company: string
  description: string
}
function Home() {
  const [rockets, setRockets] = useState<Rocket[]>([])
  const [title, setTitle] = useState('SpaceX Rockets')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.spacexdata.com/v4/rockets')
        const data = await res.json()
        
        setRockets(data)
        setTitle('SpaceX Rockets')
      } catch (error) {
        console.error('Error cargando datos:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="tabla-container">
      <h2>{title}</h2>
      <table className="tabla-posiciones">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Active</th>
            <th>Stages</th>
            <th>Boosters</th>
            <th>Cost per Launch</th>
            <th>Success Rate</th>
            <th>First Flight</th>
          </tr>
        </thead>
        <tbody>
          {rockets.map((rocket: Rocket) => (
            <tr key={rocket.id}>
              <td>{rocket.name}</td>
              <td>{rocket.type}</td>
              <td>{rocket.active ? 'Yes' : 'No'}</td>
              <td>{rocket.stages}</td>
              <td>{rocket.boosters}</td>
              <td>{rocket.cost_per_launch}</td>
              <td>{rocket.success_rate_pct}%</td>
              <td>{rocket.first_flight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home