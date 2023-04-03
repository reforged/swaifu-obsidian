export default function InputFormReponse ({ textAreaRef, value, setValue }) {
  return (
    <div>
      <textarea
        className="w-full"
        ref={textAreaRef}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
    </div>
  )
}