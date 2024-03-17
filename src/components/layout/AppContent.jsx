import { Layout } from 'antd'
import React from 'react'

export default function AppContent() {
	const contentStyle = {
		textAlign: 'center',
		minHeight: 'calc(100vh-60px)',
		lineHeight: '120px',
		color: '#fff',
		backgroundColor: '#001529',
		padding: '1rem',
	}
	return <Layout.Content style={contentStyle}>Content</Layout.Content>
}
