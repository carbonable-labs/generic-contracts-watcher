import { type ActionFunctionArgs } from "@remix-run/node";

export async function action({request}: ActionFunctionArgs) {
    const body = await request.json();
    const rpc = process.env.RPC;

    if (!rpc) {
        throw new Error('No RPC endpoint provided');
    }

    const res = await fetch(rpc, {
        method: 'POST',
        body: JSON.stringify(body)
    })

    return await res.json();
}