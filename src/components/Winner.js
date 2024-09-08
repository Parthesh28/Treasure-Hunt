import React from 'react'
import { Card } from './ui/card'
import Link from 'next/link'
import { TrophyIcon } from '@/icons'

function Winner({ data }) {
  return (
    //     <div className="flex items-center justify-center h-screen bg-gradient-to-br from-primary to-primary/80">
    <Card className="bg-background p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-primary rounded-full p-4">
          <TrophyIcon className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold tracking-widest">Team Apex, You Won!</h2>
        <p className="text-muted-foreground">Time Taken: 23:45</p>
        <Link
          href="/leaderboard"
          className="font-bold inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground shadow transition-colors hover:bg-primary/90"
          prefetch={false}
        >
          View Leaderboard
        </Link>
      </div>
    </Card>
    // </div>
  )
}

export default Winner