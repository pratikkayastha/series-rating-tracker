import * as React from "react";
import './style.css';

// Interface for form props
interface ISearchFormProps {
	resolveRatings(imdbId: string): void
}

// Interface for form state
interface ISearchFormState {
	imdbId: string,
	invalidFields: string[],
	isDrity: boolean
}

// Search form component
class SearchForm extends React.Component <ISearchFormProps, ISearchFormState> {

	constructor(props: ISearchFormProps) {
		super(props);

		const state:ISearchFormState = {
			imdbId: '',
			invalidFields: [],
			isDrity: true
		}
		this.state = state;
	}

	handleFormSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		await this.validateForm();

		if (this.state.invalidFields.length<1 && this.state.isDrity===true) {
			console.log("-TRIGGERING THE RESOLVE RATING ......");
			this.props.resolveRatings(this.state.imdbId);
		}
	}

	validateForm = ():Promise<void> => {
		return new Promise<void>((resolve) => {
			if (this.state.imdbId!==null && this.state.imdbId.trim()!=='') {
				this.setState({
					...this.state,
					invalidFields: []
				}, resolve);
			} else {
				this.setState({
					...this.state,
					invalidFields: ['imdbId']
				}, resolve);
			}
		});
	}

	handleValueChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		
		this.setState({
			...this.state,
			[name]: value,
			isDrity: true
		}, async () => {
			await this.validateForm();
		});
	}

	checkIfFieldHasError = (field:string):boolean => {
		return this.state.invalidFields.indexOf(field)>-1;
	}
	
	render() {
		return (
			<div className="form-container">
				<form onSubmit={this.handleFormSubmit} data-testid='search-form'>
					<div className='form-block'>
						<input type="text" value={this.state.imdbId} 
							onChange={this.handleValueChange} 
							name="imdbId"
							data-testid='imdbId'
							placeholder="Please enter IMDB ID for a series" />

						<input type="submit" value="Get Ratings" 
							className={`${this.state.invalidFields.length>0 || this.state.isDrity===false ? 'disabled' : ''}`}
							data-testid='submit'/>
					</div>
				</form>
			</div>
		);
	}
}

export default SearchForm;