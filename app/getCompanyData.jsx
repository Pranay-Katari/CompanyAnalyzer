export async function getCompanyData(companyName) {
    const res = await fetch("http://localhost:8000/company-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company_name: companyName }),
    });
  
    if (!res.ok) {
      throw new Error(`Error fetching company data: ${res.statusText}`);
    }
  
    const data = await res.json();
    return data;
  }
  