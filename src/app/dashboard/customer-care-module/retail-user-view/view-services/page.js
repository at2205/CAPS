'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const ViewServices = () => {
const router = useRouter()
const searchParams = useSearchParams()

const userType = searchParams.get('userType') || 'mds'
const mdsId = searchParams.get('mdsId') || ''
const agentId = searchParams.get('agentId') || ''

const isAgent = userType.toLowerCase() === 'agent'

const [services, setServices] = useState([])
const [loading, setLoading] = useState(false)
const [message, setMessage] = useState('')


const fetchServices = async () => {
try {
setLoading(true)
setMessage('')


  let url = ''

  if (isAgent) {
    if (!agentId || agentId === '-') {
      setMessage('Agent ID not found.')
      return
    }

    url = `http://localhost:8281/CustomerModule/agent-services?agentId=${agentId}&userType=agent`
  } else {
    if (!mdsId || mdsId === '-') {
      setMessage('MDS ID not found.')
      return
    }

    url = `http://localhost:8281/CustomerModule/mds-services?mdId=${mdsId}&userType=mds`
  }

  const res = await fetch(url)
  const data = await res.json()

  const list = data?.data || []

  if (!list.length) {
    setMessage('No services found.')
    setServices([])
    return
  }

  const mapped = list.map((s, i) => ({
    id: i + 1,
    name: s.displayName,
    status: (s.Status || s.status) === 'Y' ? 'Active' : 'Inactive',
    action: s.Status || s.status || 'N',
    type: s.serviceType || '0',
    serviceId: s.serviceId || '',
    remarks: '',
  }))

  setServices(mapped)
} catch (err) {
  console.error('Services API error:', err)
  setMessage('Failed to fetch services.')
} finally {
  setLoading(false)
}


}

useEffect(() => {
fetchServices()
}, [])

// -----------------------------
// HANDLE CHANGE
// -----------------------------
const handleChange = (id, field, value) => {
setServices(prev =>
prev.map(row =>
row.id === id ? { ...row, [field]: value } : row
)
)
}

// =============================
// UI
// =============================
return ( <div className="max-w-6xl mx-auto py-6 px-4">


  <div className="bg-white shadow-lg rounded-xl overflow-hidden">

    {/* HEADER */}
    <div className="bg-yellow-500 px-6 py-3 flex justify-between items-center">

      <span className="font-semibold">
        Service Control — {isAgent ? `Agent ${agentId}` : `MDS ${mdsId}`}
      </span>

      <button
        onClick={() => router.back()}
        className="bg-gray-900 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
      >
        ← Back
      </button>

    </div>

    <div className="p-6">

      {/* MESSAGE */}
      {message && (
        <div className="bg-blue-100 text-blue-700 text-center py-2 px-4 rounded mb-4">
          {message}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="text-center my-6 space-y-2">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <div className="text-gray-600">Loading services...</div>
        </div>
      )}

      {/* TABLE */}
      {!loading && services.length > 0 && (
        <div className="overflow-x-auto">

          <table className="w-full border text-sm text-center">

            <thead className="bg-orange-700 text-white">
              <tr>
                <th className="p-2 border">S.N.</th>
                <th className="p-2 border">Service</th>
                <th className="p-2 border">Action</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Service Type</th>
                {isAgent && (
                  <th className="p-2 border">Remarks</th>
                )}
              </tr>
            </thead>

            <tbody>
              {services.map((row, index) => (
                <tr key={row.id} className="border-t hover:bg-gray-50">

                  <td className="p-2 border">{index + 1}</td>

                  <td className="p-2 border font-semibold text-red-600">
                    {row.name}
                  </td>

                  <td className="p-2 border">
                    <select
                      className="border rounded px-2 py-1 text-sm"
                      value={row.action}
                      onChange={e =>
                        handleChange(row.id, 'action', e.target.value)
                      }
                    >
                      <option value="Y">Y</option>
                      <option value="N">N</option>
                    </select>
                  </td>

                  <td
                    className={`p-2 border font-bold ${
                      row.status === 'Active'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {row.status}
                  </td>

                  <td className="p-2 border">
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-20 text-center"
                      value={row.type}
                      onChange={e =>
                        handleChange(row.id, 'type', e.target.value)
                      }
                    />
                  </td>

                  {isAgent && (
                    <td className="p-2 border">
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        placeholder="Enter remarks"
                        value={row.remarks}
                        onChange={e =>
                          handleChange(row.id, 'remarks', e.target.value)
                        }
                      />
                    </td>
                  )}

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  </div>
</div>


)
}

export default ViewServices
