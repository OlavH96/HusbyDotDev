import "./Css.css";
import Buttons from './Buttons/Buttons';

function Css() {
	return (
		<main>
			<section>
				<h1>Cool css :has magic</h1>
				<div className="cards">
					<div className="card">
						Some text
					</div>
					<div className="card">
						Some text
					</div>
					<div className="card">
						Some text
					</div>
					<div className="card">
						Some text
					</div>
					<div className="card">
						Some text
					</div>
					<div className="card">
						Some text
					</div>
				</div>
			</section>
			<hr />

			{/* <section>
				<h1>Buttons</h1>
				<Buttons/>
			</section> */}
		</main>
	)
}

export default Css;