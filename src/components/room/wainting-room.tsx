export default function WaintingRoom () {

  return (
    <div className="overflow-y-hidden flex items-center h-full max-h-screen min-h-screen">
      <div className="text-center w-full flex flex-col pt-5">
        <h1 className="text-6xl font-bold text-gray-900">Veuillez patientier</h1>
        <span className="mt-2 text-sm text-gray-600">En attendant que le professeur lance la session</span>

        <div className="mt-8">
          <a href="/" className="bg-indigo-600 text-white px-4 py-2 rounded-md">
            Retour à l'accueil
          </a>
        </div>

        <div className="mx-auto mt-8 object-cover rounded-md overflow-hidden">
          <img src="https://cdn.discordapp.com/attachments/1052152529682710558/1092379703068868608/reforged.gif" alt=""/>
        </div>

      </div>

    </div>
  )
}