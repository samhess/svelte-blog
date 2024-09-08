
/** @type {import('./$types').LayoutServerLoad} */
export async function load({locals}) {
  const {session, user} = locals
  return {session, user}
}
