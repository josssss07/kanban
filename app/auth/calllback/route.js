import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // If "next" is in param, use it as the redirect URL, otherwise go to home (`/Home`)
  const next = searchParams.get('next') ?? '/Home'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      
      // Always redirect to `/Home` regardless of environment
      if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}/Home`)
      } else {
        return NextResponse.redirect(`${origin}/Home`)
      }
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}