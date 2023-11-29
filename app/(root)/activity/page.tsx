import { fetchUser, getActivity } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';

import { redirect } from 'next/navigation';

import UserCard from '@/components/Cards/UserCard';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  accountId: string;
}

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect('/onboarding');

  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className='head-text'>Activity</h1>
      <section className=' mt-10 flex flex-col gap-5'>
        {activity.length > 0 ? (
          <>
            {activity.map((activ) => (
              <Link href={`/thread/${activ.parentId}`} key={activ._id}>
                <article className='activity-card'>
                  <Image
                    src={activ.author.image}
                    width={20}
                    height={20}
                    alt={activ.author.name}
                    className=' rounded-full'
                  />
                  <p className='!text-small-regular text-light-1'>
                    <span className='  text-primary-500'>
                      {activ.author.name}
                    </span>{' '}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className='!text-base-regular  text-light-3'>No activity yet</p>
        )}
      </section>
    </section>
  );
};

export default Page;
