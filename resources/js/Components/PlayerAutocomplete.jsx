import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { select } from "@material-tailwind/react"
export default function PlayerAutocomplete({ players, index, addPlayer, player }) {

  const [selected, setSelected] = useState('')
  const [query, setQuery] = useState('')

  const filteredPlayers =
    query === ''
      ? players
      : players.filter((user) =>
        user.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  const handleSelectPlayer = (player, index) => {
    addPlayer(player, index)
    setSelected()
  }

  return (
    <select className="w-full">
      <option value={null}></option>
      {players.map(p => (<option value={p.id}>{p.name}</option>))}
    </select>
  );
}