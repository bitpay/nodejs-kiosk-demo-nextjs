// @ts-ignore
import dataYaml from '/public/application.yaml'

const HeaderForm = () => {
return (
  <header className="bg-white shadow-sm lg:static lg:overflow-y-visible">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
        <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
          <div className="flex-shrink-0 flex items-center p-5">
            <a href="#">
              <img
                src={dataYaml.bitpay.design.logo}
                alt="Logo"
                width={284}
                height={34}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
)}

export default HeaderForm;