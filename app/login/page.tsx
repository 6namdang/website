'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const signIn = async () => {
        const supabase = createClient()
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (!error) {
            router.push('/')
        }
    }

    return (
        <div className="max-w-md mx-auto p-8 mt-20">
            <h1 className="text-2xl font-bold mb-8">Login (for me to easily put blog up)</h1>
            <div className="space-y-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded"
                />
                <button onClick={signIn} className="w-full px-4 py-2 bg-blue-600 text-white rounded">
                    Login
                </button>
            </div>
        </div>
    )
}