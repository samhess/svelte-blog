
/** @type {import('./$types').LayoutServerLoad} */
export async function load({locals, route}) {
  const {session, user} = locals
  return {session, user}
}
