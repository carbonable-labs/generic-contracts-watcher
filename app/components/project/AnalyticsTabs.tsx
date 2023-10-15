import * as Tabs from '@radix-ui/react-tabs';
import FarmingYield from './analytics/FarmingYield';
import CarbonRetirement from './analytics/CarbonRetirement';

export default function AnalyticsTabs() {
    const triggerClassName = 'px-6 py-3 flex-1 flex items-center justify-start text-lg text-neutral-200 border-b-[1px] border-opacityLight-5 hover:text-neutral-100 hover:cursor-pointer data-[state=active]:text-neutral-100 data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:border-greenish-500';
    const contentClassName = 'grow py-6 outline-none w-full';
    return (
        <Tabs.Root defaultValue="farmingYield" className='flex flex-col mt-8 w-full'>
            <Tabs.List className="shrink-0">
                <div className='w-full flex'>
                    <Tabs.Trigger value="farmingYield" className={triggerClassName}>Farming Yield</Tabs.Trigger>
                    <Tabs.Trigger value="carbonRetirement" className={triggerClassName}>Carbon Retirement</Tabs.Trigger>
                </div>
                <div className='w-full'>
                    <Tabs.Content value="farmingYield" className={contentClassName}><FarmingYield /></Tabs.Content>
                    <Tabs.Content value="carbonRetirement" className={contentClassName}><CarbonRetirement /></Tabs.Content>
                </div>
            </Tabs.List>
        </Tabs.Root>
    );
}