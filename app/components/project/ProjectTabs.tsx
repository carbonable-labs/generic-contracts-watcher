import * as Tabs from '@radix-ui/react-tabs';

export default function ProjectTabs() {
    const triggerClassName = 'px-6 py-3 flex-1 flex items-center justify-start text-lg text-neutral-200 hover:text-neutral-100 hover:cursor-pointer data-[state=active]:text-neutral-100 data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:border-greenish-500';
    const conteantClassName = 'grow p-6 outline-none w-full';
    return (
        <Tabs.Root defaultValue="project" className='flex flex-col mt-8 w-full'>
            <Tabs.List className="shrink-0">
                <div className='w-full flex'>
                    <Tabs.Trigger value="project" className={triggerClassName}>Project</Tabs.Trigger>
                    <Tabs.Trigger value="minter" className={triggerClassName}>Minter</Tabs.Trigger>
                    <Tabs.Trigger value="yielder" className={triggerClassName}>Yielder</Tabs.Trigger>
                    <Tabs.Trigger value="offseter" className={triggerClassName} >Offseter</Tabs.Trigger>
                </div>
                <div className='w-full'>
                    <Tabs.Content value="project" className={conteantClassName}>Project</Tabs.Content>
                    <Tabs.Content value="minter" className={conteantClassName}>Minter</Tabs.Content>
                    <Tabs.Content value="yielder" className={conteantClassName}>Yielder</Tabs.Content>
                    <Tabs.Content value="offseter" className={conteantClassName}>Offseter</Tabs.Content>
                </div>
            </Tabs.List>
        </Tabs.Root>
    );
}