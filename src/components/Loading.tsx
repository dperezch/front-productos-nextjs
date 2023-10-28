

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-gray-600 text-2xl mb-6">
            Loading ....
        </div>
        <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-green-400 ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white"></div>
        </div>
    </div>
  )
}

export default Loading