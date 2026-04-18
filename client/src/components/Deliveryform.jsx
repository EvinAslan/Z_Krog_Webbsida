export default function DeliveryForm() {
    return (
        <div>
            <h4 className="mb-4">1. Leveransuppgifter</h4>
            <div className="row">
                <div className="col-md-12 mb-2">
                    <label className="small fw-bold">NAMN</label>
                    <input className="form-control" type="text" placeholder="För- och efternamn" required />
                </div>
                <div className="col-md-12 mb-2">
                    <label className="small fw-bold">ADRESS</label>
                    <input className="form-control" type="text" placeholder="Gatunamn och nummer" required />
                </div>
                <div className="col-md-12 mb-4">
                    <label className="small fw-bold">TELEFON (VALFRITT)</label>
                    <input className="form-control" type="tel" placeholder="07x-xxx xx xx" />
                </div>
            </div>
        </div>
    );
}