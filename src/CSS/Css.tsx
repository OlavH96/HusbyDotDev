import "./Css.css";
import Buttons from './Buttons/Buttons';

function Css() {
	return (
		<main className="css-container">
			<h1>CSS display</h1>
			<section>
				<h2>Css :has relational selector examples</h2>
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

			<section>
				<h2>Buttons</h2>
				<Buttons/>
			</section>

			<section>
				<h2>Another section</h2>
			</section>
			<section>
				<h2>Another section (auto numbered)</h2>
			</section>
		</main>
	)
}

export default Css;