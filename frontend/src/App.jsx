import { useState } from 'react'
const defaultApiBase = import.meta.env.VITE_API_URL || ''

export default function App() {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [apiBase, setApiBase] = useState(defaultApiBase || 'http://localhost:8081')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setResult('Loading…')
    try {
      const base = (apiBase || '').replace(/\/$/, '')
      const url = `${base}/greet?name=${encodeURIComponent(name)}&birth_year=${encodeURIComponent(birthYear)}`
      const res = await fetch(url)
      const data = await res.json()
      setResult(res.ok ? JSON.stringify(data, null, 2) : `Error: ${data.error || res.status}`)
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 16, fontFamily: 'system-ui' }}>
      <h1>Greet (React + Go)</h1>
      <p>React frontend + Go API — one repo.</p>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: 8 }}>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} required placeholder="Alice" style={{ width: '100%', padding: 8, marginBottom: 12, boxSizing: 'border-box' }} />
        <label style={{ display: 'block', marginBottom: 8 }}>Birth year</label>
        <input type="number" value={birthYear} onChange={e => setBirthYear(e.target.value)} required placeholder="1990" style={{ width: '100%', padding: 8, marginBottom: 12, boxSizing: 'border-box' }} />
        <label style={{ display: 'block', marginBottom: 8 }}>API URL (e.g. http://localhost:8081)</label>
        <input value={apiBase} onChange={e => setApiBase(e.target.value)} placeholder="http://localhost:8081" style={{ width: '100%', padding: 8, marginBottom: 12, boxSizing: 'border-box' }} />
        <button type="submit" style={{ padding: '8px 16px' }}>Greet</button>
      </form>
      {error && <p style={{ color: '#c00' }}>Error: {error}</p>}
      {result != null && <pre style={{ background: '#f0f0f0', padding: 16, borderRadius: 4, whiteSpace: 'pre-wrap' }}>{result}</pre>}
    </div>
  )
}
