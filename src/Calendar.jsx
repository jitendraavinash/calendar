import "./Calendar.css"
import { addDays, format, subDays, isEqual } from 'date-fns'
import { useState } from 'react';

const today = new Date();

const events = [
  {
    id: 1,
    date: today,
    slots: [
      1692847800000, 1692855000000
    ]
  },
  {
    id: 2,
    date: addDays(today, 1),
    slots: [
      1692847800000, 1692849000000, 1692855000000
    ]
  },
  {
    id: 3,
    date: addDays(today, 2),
    slots: [
      1692859800000
    ]
  },
  {
    id: 4,
    date: addDays(today, 3),
    slots: [
      1692859800000
    ]
  },
  {
    id: 5,
    date: addDays(today, 4),
    slots: [
      1692859800000
    ]
  }

]

export default function Calendar() {
  const [activeDates, setActiveDates] = useState(getNextWorkingDays(today, 4))

  const handleRight = () => {
    activeDates.splice(0, 1);
    activeDates.push(addDays(activeDates[activeDates.length - 1], 1))
    setActiveDates([...activeDates])
  }

  const handleLeft = () => {
    activeDates.pop()
    activeDates.unshift(subDays(activeDates[0], 1))
    setActiveDates([...activeDates])
  }

  return <div style={{ width: "100vw" }}>
    <table className="spec-table" id="here_table">
      <thead>
        <tr>
          <th className="icon gg-chevron-left" onClick={handleLeft}></th>
          {activeDates.map(ad => {
            return <th key={ad.getDate()}>
              <p>{format(ad, "E")}</p>
              <p>{format(ad, "MMM dd")}</p>
            </th>
          })}
          <th className="icon gg-chevron-right" onClick={handleRight}></th>
        </tr>
      </thead>
      <tbody>
        <tr className="orientation">
        </tr>
        {activeDates.map(ad => {
          let adEvents = events.find(x => isEqual(x.date, ad))
          return <tr className="orientation" key={ad}>
            {adEvents?.slots.map(x => {
              return <td className="event" key={x}>
                <p>{format(x, "HH:mm a")}</p>
              </td>
            })}
          </tr>
        })}
      </tbody>
    </table>
  </div>
}

function getNextWorkingDays(startDate, count) {
  let res = [startDate];
  let i = 0;
  let ld = startDate
  while (i < count) {
    let nd = addDays(ld, 1);
    if (nd.getDay() !== 0 || nd.getDay() !== 6) {
      res.push(nd);
      i++
    }
    ld = nd
  }
  return res
}
