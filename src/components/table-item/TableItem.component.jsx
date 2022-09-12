import React from 'react'
import { FlapDisplay, Presets } from 'react-split-flap-effect'
import { TableItemContainer } from './TableItem.styles'

const TableItem = ({ year, name, status }) => {
    return (
        <tr>
            <td>
                <FlapDisplay
                    chars={Presets.ALPHANUM}
                    length={year.length}
                    value={year}
                    // className={'M'}
                />
            </td>
            <td>
                <FlapDisplay
                    chars={Presets.ALPHANUM}
                    length={name.length}
                    value={name}
                    // className={'M'}
                />
            </td>
            <td>
                <FlapDisplay
                    chars={Presets.ALPHANUM}
                    length={status.length}
                    value={status}
                    // className={'M'}
                />
            </td>
        </tr>

    )
}

export default TableItem