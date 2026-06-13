import CarouselA from '../components/carousels/CarouselA';
import CarouselB from '../components/carousels/CarouselB';
import Quotes from '../components/ui/Quotes';
import SurpriseMe from '../components/SurpriseMe';
import { useContext } from 'react';
import { BookSearchContext } from '../context/BookSearchContext';

// [this should be /main]

const MainPage = () => {
  const { state, dispatch } = useContext(BookSearchContext);
  return (
    <div className='main-page-outer-wrapper flex flex-col gap-4'>
      <div className='search-footer flex px-45 gap-2 text-white'>
        {/* <span className='p-[20px] font-avenir'>Welcome</span>
        <span className='p-[20px] font-avenir'>User</span> */}
      </div>

      <div className='main-page-wrapper max-w-[1380px] h-[800px] flex justify-center'>
        <div className='main-page flex max-w-[1200px] flex-col gap-8'
        >

          <div className='inner-main-page flex flex-row max-w-[1300px] gap-4 items-center'>
            <div className='card shadow-2xl border-white/[0.06] min-w-[500px] h-[400px] rounded-2xl border-1 grow '
              style={{
                background: "linear-gradient(135deg, #191920 0%, #1e1a2e 100%)",
              }}>
              <CarouselA state={state} dispatch={dispatch} />
            </div>
            <div className='card shadow-2xl border-white/[0.06] max-w-[685px] h-[400px] rounded-2xl border-1 grow'
              style={{
                background: "#191920"
              }}>
              <CarouselB state={state} dispatch={dispatch} />
            </div>
          </div>

          <div className='inner-main-page flex flex-row max-w[1300px] gap-4 items-center'>
            <div className='card shadow-2xl border-white/[0.06] border-1  min-w-[600px] h-[300px] rounded-2xl grow'
              style={{
                background: "#191920"
              }}>
              <Quotes quoteData={state.quoteData} />
            </div>
            <div className='card shadow-2xl border-white/[0.06] border-1  w-[600px] h-[300px] rounded-2xl grow'
              style={{
                background: "#191920"
              }}>
              <SurpriseMe state={state} dispatch={dispatch} />
            </div>
            <div className='card shadow-2xl border-white/[0. border-1  w-[600px] h-[300px] rounded-2xl grow backdrop-blur-2xl'>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MainPage;
