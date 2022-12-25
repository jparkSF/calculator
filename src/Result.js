import React from 'react'

export default function Result({ results, resetState }) {
  if (!results) return null;

  const sortedAges = [...results.sort((a, b) => b.age - a.age)];

  return (
    <div>
      <h1>{sortedAges[0].name} is {sortedAges[0].age}!</h1>
      {sortedAges.length > 1 && <div>Followed by: {sortedAges.slice(1).map(age => `${age.name} (${age.age})`).join(', ')}</div>}
      <button className='reset-button' onClick={resetState}>Reset</button>
    </div>
  )
}
