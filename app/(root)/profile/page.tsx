import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/events.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const profilePage = async ({searchParams}:SearchParamProps) => {
    const {sessionClaims}  = auth();
    const userId = sessionClaims?.userId as string;

    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const eventsPage = Number(searchParams?.eventsPage) || 1;

    const organizedEvents = await getEventsByUser({userId,page:eventsPage})
    const orders = await getOrdersByUser({userId,page:ordersPage})
    const orderedEvents = orders?.data.map((order:IOrder)=> order.event) || [];

    

  return (
    <>
    {/* my tickes */}
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sd:justify-between'>
            <h3 className='h3-bold text-center sm:text-left'> My Tickets </h3>
            <Button asChild size="lg" className='button hidden sm:flex'>
                <Link href="/#events">
                    Explore More Events
                </Link>
            </Button>
        </div>
    </section>

    <section className='wrapper my-8'>
        <Collection 
            data={orderedEvents}
            emptyTitle="no event tickets purchased yet"
            emptyStateSubtext="plenty of events to explore"
            collectionType="My_Tickets"
            limit={3}
            page={ordersPage}
            urlParamName='ordersPage'
            totalPages={orders?.totalPages}
            />
    </section> 
    {/* events organised  */}
        <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
            <div className='wrapper flex items-center justify-center sd:justify-between'>
                <h3 className='h3-bold text-center sm:text-left'> Events Organized</h3>
                <Button asChild size='lg' className='button hidden sm:flex'>
                    <Link href="/events/create">
                        Create new event
                    </Link>
                </Button>
            </div>
        </section>

        <section className='wrapper my-8'>
        <Collection 
            data={organizedEvents?.data}
            emptyTitle="no events created yet"
            emptyStateSubtext="go create some"
            collectionType="Events_Organized"
            limit={6}
            page={eventsPage}
            urlParamName='eventsPage'
            totalPages={organizedEvents?.totalPages}
            />
    </section>
    </>
  )
}

export default profilePage