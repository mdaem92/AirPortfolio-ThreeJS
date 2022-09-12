import React from 'react'
import { FlapDisplay, Presets } from 'react-split-flap-effect'
import TableItem from '../table-item/TableItem.component'

const Table = () => {
    return (
        <table >
            <tr>
                <th>
                    <FlapDisplay
                        chars={Presets.ALPHANUM + ',:'}
                        length={4}
                        value={'YEAR'}
                        // className={'M'}
                    />
                </th>
                <th>
                    <FlapDisplay
                        chars={Presets.ALPHANUM + ',:'}
                        length={4}
                        value={'NAME'}
                        // className={'M'}
                    />
                </th>
                <th>
                    <FlapDisplay
                        chars={Presets.ALPHANUM + ',:'}
                        length={6}
                        value={'STATUS'}
                        // className={'M'}
                    />
                </th>

            </tr>
            <TableItem year={'2019'} name={'Car Trades Demo'} status={'Live'}/>
            <TableItem year={'2021'} name={'DBT Journal App'} status={'Live'}/>
            <TableItem year={'2022'} name={'ThreeJS Portfolio'} status={'Live'}/>
            <TableItem year={'2022'} name={'NFT Marketplace'} status={'In Progress'}/>

        </table>
    )
}

export default Table