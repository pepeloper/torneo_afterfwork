import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Select, Option } from "@material-tailwind/react"
export default function PlayerAutocomplete({ players, index, addPlayers, player }) {

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

  const handleSelectPlayer = (e) => {
    let value = Array.from(e.target.selectedOptions, option => players[option.value].id);
    addPlayers(value)
    setSelected()
  }

  return (
    <select className="w-full" label="Selecciona un jugador" multiple onChange={handleSelectPlayer}>
      {/* <option value={null}></option> */}
      {players.map((p, index) => (<option key={p.id} value={index}>{p.name}</option>))}
    </select>
  );
}