import {
  entrepriseIndustryOptions,
  entrepriseSizeOptions,
} from "@assets/form-options/form-options";
import EntrepriseCard from "@components/backoffice/EntrepriseCard/EntrepriseCard";
import { createEntreprise, getEntreprises } from "@services/APIcall";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllEntreprises() {
  // Fetched info
  const [entreprises, setEntreprises] = useState([]);

  // Form data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [industry, setIndustry] = useState("");

  const navigate = useNavigate();

  const loadEntreprises = () => {
    getEntreprises().then((res) => {
      setEntreprises(() => {
        return res.map((elt) => {
          return {
            id: elt.id,
            name: elt.name,
            size: elt.size,
            industry: elt.industry,
            nb_active_offers: elt.nb_active_offers,
            nb_filled_offers: elt.nb_filled_offers,
            nb_unfilled_offers: elt.nb_unfilled_offers,
          };
        });
      });
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await createEntreprise({ name, description, size, industry });
    setName("");
    setDescription("");
    setSize("");
    setIndustry("");
    loadEntreprises();
  };

  const tableColumns = [
    {
      title: "ID",
      field: "id",
      type: "numeric",
      cellStyle: { width: "4%" },
      width: "4%",
      headerStyle: { width: "4%" },
    },
    {
      title: "Nom",
      field: "name",
      /* cellStyle: { width: "15%" },
      width: "15%",
      headerStyle: { width: "15%" }, */
    },
    {
      title: "Taille",
      field: "size",
      /* cellStyle: { width: "8%" },
      width: "8%",
      headerStyle: { width: "8%" }, */
    },
    {
      title: "Secteur",
      field: "industry",
      /* cellStyle: { width: "15%" },
      width: "10%",
      headerStyle: { width: "15%" }, */
    },
    {
      title: "Offres actives",
      field: "nb_active_offers",
      /* cellStyle: { width: "10%" },
      width: "10%",
      headerStyle: { width: "10%" }, */
    },
    {
      title: "Offres pourvues",
      field: "nb_filled_offers",
      /* cellStyle: { width: "10%" },
      width: "10%",
      headerStyle: { width: "10%" }, */
    },
    {
      title: "Offres non-pourvues",
      field: "nb_unfilled_offers",
      /* cellStyle: { width: "13%" },
      width: "13%",
      headerStyle: { width: "13%" }, */
    },
  ];

  const options = {
    pageSize: 30,
    emptyRowsWhenPaging: false,
    pageSizeOptions: [10, 20, 30],
  };

  useEffect(loadEntreprises, []);

  return (
    <div className="flex flex-col gap-16">
      <div>
        <h1>Entreprises</h1>
        <ul className="md:hidden">
          {entreprises.length > 0 &&
            entreprises.map((entreprise) => {
              return (
                <EntrepriseCard key={entreprise.id} entreprise={entreprise} />
              );
            })}
        </ul>
        {entreprises.length > 0 && (
          <div className="hidden md:block">
            <MaterialTable
              title="Liste des entreprises"
              columns={tableColumns}
              data={entreprises}
              onRowClick={(_, rowData) => navigate(rowData.id.toString())}
              options={options}
            />
          </div>
        )}
      </div>
      <form>
        <h2>Nouvelle entreprise</h2>
        <div className="flex flex-wrap gap-8 ">
          <div className="w-full flex gap-8">
            <label htmlFor="name">Nom :</label>
            <input
              type="text"
              value={name}
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full flex gap-8">
            <label htmlFor="size">Taille : </label>
            <select
              id="size"
              name="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {entrepriseSizeOptions.map((sizeName) => (
                <option value={sizeName}>{sizeName}</option>
              ))}
            </select>
          </div>
          <div className="w-full flex gap-8">
            <label htmlFor="industry">Secteur : </label>
            <select
              id="industry"
              name="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              {entrepriseIndustryOptions.map((sectorName) => (
                <option value={sectorName}>{sectorName}</option>
              ))}
            </select>
          </div>
          <div className="w-full flex gap-8 ">
            <textarea
              className="w-full h-[300px] p-2"
              id="description"
              name="description"
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div className="flex justify-center">
        <button
          type="button"
          className="text-2xl w-1/2 font-bold border-2 p-[20px] rounded-md text-slate-100 bg-sky-600 hover:bg-sky-800 "
          onClick={(e) => handleCreate(e)}
        >
          CREER ENTREPRISE
        </button>
      </div>
    </div>
  );
}
