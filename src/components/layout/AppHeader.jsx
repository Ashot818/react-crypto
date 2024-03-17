import { Button, Drawer, Layout, Modal, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useCrypto } from '../../context/crypto-context'
import AddAssetForm from '../AddAssetForm'
import CoinInfoModal from '../CoinInfoModal'

export default function AppHeader() {
	const [select, setSelect] = useState(false)
	const [modal, setModal] = useState(false)
	const [coin, setCoin] = useState(null)
	const [drawer, setDrawer] = useState(false)

	const { crypto } = useCrypto()

	useEffect(() => {
		const keypress = event => {
			if (event.key === '/') {
				setSelect(prev => !prev)
			}
		}
		document.addEventListener('keypress', keypress)

		return () => document.removeEventListener('keypress', keypress)
	}, [])
	function handleSelect(value) {
		setCoin(crypto.find(c => c.icon === value))
		setModal(true)
	}
	const headerStyle = {
		width: '100%',
		textAlign: 'center',
		height: 60,
		padding: '1rem',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	}

	return (
		<div>
			<Layout.Header style={headerStyle}>
				<Select
					style={{
						width: 260,
					}}
					open={select}
					onClick={() => setSelect(prev => !prev)}
					onSelect={handleSelect}
					value='press / open'
					options={crypto.map(coin => ({
						label: coin.name,
						value: coin.icon,
						icon: coin.icon,
					}))}
					optionRender={option => (
						<Space>
							<img
								style={{ width: 20 }}
								src={option.data.icon}
								alt={option.data.label}
							/>{' '}
							{option.data.label}
							{option.data.desc}
						</Space>
					)}
				/>
				<Button type='primary ' onClick={() => setDrawer(true)}>
					Add asset
				</Button>
				<Modal open={modal} onCancel={() => setModal(false)} footer={null}>
					<CoinInfoModal coin={coin} />
				</Modal>
				<Drawer
					width={600}
					title='Add Asset'
					onClose={() => setDrawer(false)}
					open={drawer}
				>
					<AddAssetForm />
				</Drawer>
			</Layout.Header>
		</div>
	)
}
